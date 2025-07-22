import { createRedisClient } from "redis-client";
import { ApiErr } from "../utils/apiErr";
import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";
import { imageGeneration, imageGenerationFromPack } from "commontypes/types";
import { prismaClient } from "db";

const redisClient = createRedisClient();
export const getImages = handler(async (req, res, next) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const skip = (page - 1) * pageSize;

  const [images, totalImages] = await Promise.all([
    prismaClient.outputImages.findMany({
      where: {
        userId:  req.user.id,
      },
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prismaClient.outputImages.count(),
  ]);
  const totalPages = Math.ceil(totalImages / pageSize);

  return res
    .status(200)
    .json(
      ApiRes(200, "Success", {
        data: { images, page, pageSize, totalImages, totalPages },
      })
    );
});

export const getImagesById = handler(async (req, res, next) => {
  const imageId = req.params.imageId;
  if(!imageId) return next(new ApiErr(400, "Image ID is required."));

  const image = await prismaClient.outputImages.findFirst({where:{id:imageId}})  
  if(!image)return next(new ApiErr(404, "Image not found."));

  if(!image.isGeneratedSuccessfully) 
   return res.status(200).json(ApiRes(200, "Image is in processing",{data:false}));

  return res.status(200).json(ApiRes(200, "Success", { image }));  
});


export const generateAiImagesFromModel = handler(async (req, res, next) => {
  const data = imageGeneration.safeParse(req.body);
  if (!data.success) return next(new ApiErr(400, data.error.message)); 
  
    
    const generatedImage = await prismaClient.outputImages.create({
    data: {
      modelId: data.data.modelId,
      prompt: data.data.prompt,
      userId:  req.user.id,      
    },
  });
  
  if(!generatedImage) return next(new ApiErr(500, "Failed to generate image."));

  const task = {
        type: "imageGeneration",
        payload: {
          prompt:data.data.prompt,
          modelId:data.data.modelId,
          userId:req.user.id,
          generatedImageId:generatedImage.id
        },
        callbackUrl: `${process.env.WEBHOOK_URL}/api/webhook/generate-image-result`
      };
  const redisQueue = await redisClient.rpush("imageGeneration", JSON.stringify(task));
    console.log("redisQueue: ",redisQueue);

  console.log("redis done");

  return res
  .status(200)
  .json(ApiRes(200, "Successfully starts image generation process", { imageId: generatedImage.id }));
});

export const generateAiImagesFromPack = handler(async (req, res, next) => {
  const data = imageGenerationFromPack.safeParse(req.body);
  if (!data.success) return next(new ApiErr(400, data.error.message));

  const prompts = await prismaClient.packPrompts.findMany({
    where: {
      packId: data.data.packId,
    },
    select: {
      prompt: true,
    },
  });

  if (!prompts) return next(new ApiErr(404, "Prompts not found."));

  const generatedImage = await prismaClient.outputImages.createManyAndReturn({
    data: prompts.map((x: { prompt: string }) => {
      return {
        modelId: data.data.modelId,
        prompt: x.prompt,
        userId:  req.user.id,
        imageUrl: "https://picsum.photos/200",
      };
    }),
  });
  return res
    .status(200)
    .json(
      ApiRes(200, "Success", { data: generatedImage.map((x: any) => x.id) })
    );
});

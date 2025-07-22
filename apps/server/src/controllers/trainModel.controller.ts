import { ApiErr } from "../utils/apiErr";
import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";
import { imageGeneration, trainModel } from "commontypes/types";
import { prismaClient } from "db";
import { createRedisClient } from "redis-client";

const redisClient = createRedisClient();
export const trainAiModel = handler(async (req, res, next) => {
    const { name, type, ethinicity, eyeColor, bald } = req.body;
    const images = req.files as Express.Multer.File[];
    console.log(req.user.id)
    const data = trainModel.safeParse({
        name,
        type,
        ethinicity,
        eyeColor,
        bald,
        images
    });
    
  if (!data.success) return next(new ApiErr(400,data.error.message));
  
  const trainModelData = await prismaClient.models.create({
    data: {
      name: data.data.name,
      type: data.data.type,
      ethinicity: data.data.ethinicity,
      eyeColor: data.data.eyeColor,
      bald: Boolean(data.data.bald),
      userId:  req.user.id,
    },
  });
  if (!trainModelData) return next(new ApiErr(500, "Failed to save model."));

  const task = {
    type: "trainModel",
    payload: {
      modelId:trainModelData.id,
      images: data.data.images,
    },
    callbackUrl: `${process.env.WEBHOOK_URL}/api/webhook/train-model-result`
  };

  const redisQueue = await redisClient.rpush("trainModel", JSON.stringify(task));
  console.log("redisQueue: ",redisQueue);

  if (!redisQueue) return next(new ApiErr(500, "Failed to start train model."));

  return res
    .status(200)
    .json(ApiRes(200, "Model training started.",{modelId:trainModelData.id}));
});


export const getModelById = handler(async(req,res,next)=>{
   const modelID = req.params.modelID 
  if (!modelID) return next(new ApiErr(400, "Model ID is required."));

  const model = await prismaClient.models.findUnique({
    where: {
      id: modelID,
    },
  });

  if (!model) return next(new ApiErr(404, "Model not found."));
  if(model.status!='success') return next(new ApiErr(400, "Training is in process."));

  return res.status(200).json(ApiRes(200, "Success", { data: model }))    
})

export const getAllModels = handler(async (req, res, next) => {
  const user = req.user.id;
  const models = await prismaClient.models.findMany({
    where:{
      user:user.id
    }
  })
  if (!models) return next(new ApiErr(404, "No models found."));
  return res.status(200).json(ApiRes(200, "Success", { data: models }));

})

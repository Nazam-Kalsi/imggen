import { prismaClient } from "db";
import { handler } from "../utils/handler";
import { ApiErr } from "../utils/apiErr";

export const trainModelResult = handler(async (req, res, next) => {
  console.log("req.body: ", req.body);
  if(!req.body.status){
return next(new ApiErr(500, "Failed to start train model."));  }
  const model = await prismaClient.models.update({
    where: {
      id: req.body.modelId,
    },
    data: {
      status: req.body.status,
      zipUrl:req.body.url
    },
  });

  res.status(200).json("done👍");
});

export const imageGenerationResult = handler(async (req, res, next) => {
  console.log("req.body: ", req.body);
  const userImage = await prismaClient.outputImages.update({
    where:{
      id:req.body.generatedImageId
    },
    data:{
      isGeneratedSuccessfully:true
    }
  });
  return res.status(200).json("done👍");
})

export const imageGenerationFromPackResult = handler(async (req, res, next) => {
  try {
    console.log("req.body: ", req.body);

    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    for (const item of data) {
      await prismaClient.outputImages.update({
        where: { id: item.dbId },
        data: {
          isGeneratedSuccessfully: true,
          imageUrl: item.imageUrl,
          prompt: item.prompt,
        },
      });
    }

    return res.status(200).json("done👍");
  } catch (error) {
    console.error("Error updating images: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



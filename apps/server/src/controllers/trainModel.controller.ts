import { ApiErr } from "../utils/apiErr";
import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";
import { imageGeneration, trainModel } from "commontypes/types";
import { prismaClient } from "db";
import { redisClient } from "redis-client";

export const trainAiModel = handler(async (req, res, next) => {
  const data = trainModel.safeParse(req.body);
  console.log(data);
  if (!data.success) return next(new ApiErr(400,data.error.message));
  
  const task = {
    type: "trainModel",
    payload: {
      zipUrl: data.data.zipUrl,
    },
    callbackUrl: `${process.env.WEBHOOK_URL}/train-model-result`
  };

  const redisQueue = await redisClient.rpush("trainModel", JSON.stringify(task));
  console.log("redisQueue: ",redisQueue);

  // const trainModelData = await prismaClient.models.create({
  //   data: {
  //     name: data.data.name,
  //     type: data.data.type,
  //     ethinicity: data.data.ethinicity,
  //     eyeColor: data.data.eyeColor,
  //     bald: data.data.bald,
  //     zipUrl: data.data.zipUrl,
  //     userId: req.user.id ?? "123",
  //   },
  // });

  if (!redisQueue) return next(new ApiErr(500, "Failed to start train model."));
  return res
    .status(200)
    .json(ApiRes(200, "Model traing started."));
});

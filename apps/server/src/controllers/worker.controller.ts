import { prismaClient } from "db";
import { handler } from "../utils/handler";

export const workerResponse = handler(async (req, res, next) => {
  console.log("req.body: ", req.body);
  const model = await prismaClient.models.update({
    where: {
      id: req.body.modelId,
    },
    data: {
      status: req.body.status,
    },
  });

  res.status(200).json("done👍");
});

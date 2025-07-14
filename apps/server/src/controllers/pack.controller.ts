import { ApiErr } from "../utils/apiErr";
import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";
import { imageGenerationFromPack } from "commontypes/types";
import { prismaClient } from "db";

export const createPack = handler(async (req, res, next) => {
  const { prompts, packName } = req.body;

  if (!prompts || !Array.isArray(prompts) || prompts.length === 0)
    return next(
      new ApiErr(400, "Prompts are required and should be an array.")
    );
  if (prompts.length > 10)
    return next(new ApiErr(400, "Atleast 10 prompts are required."));

  const pack = await prismaClient.pack.create({data:{ packName }});

  if(!pack)
    return next(new ApiErr(500, "Failed to create pack."));

  const packPrompts = await prismaClient.packPrompts.createManyAndReturn({
    data: prompts.map((prompt: string) => {
      return {
        prompt,
        packId: pack.id,
      };
    }),
  });

  return res.status(200).json(ApiRes(200, "Success",{data:{pack,packPrompts}}));
});

export const getPacks = handler(async (req, res, next) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const skip = (page - 1) * pageSize;

  const [packs, total] = await Promise.all([
    prismaClient.pack.findMany({
      skip,
      take: pageSize,
    }),
    prismaClient.pack.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);
  return res
    .status(200)
    .json(
      ApiRes(200, "Success", {
        data: { packs, page, pageSize, total, totalPages },
      })
    );
});

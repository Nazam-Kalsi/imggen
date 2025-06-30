import { ApiErr } from "../utils/apiErr";
import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";
import {trainModel} from "commontypes/types"
import {prismaClient} from 'db'

export const trainAiModel = handler(async(req,res,next)=>{
    const data = trainModel.safeParse(req.body);

    if(!data.success) return next(new ApiErr(400,data.error.message));

    const trainModelData = await prismaClient.trainAiModel.create({
        data:{

        }
    })




    return res.status(200).json(ApiRes(200,"Success"))
})


export const generateAiImagesFromModel = handler(async(req,res,next)=>{
    return res.status(200).json(ApiRes(200,"Success"))
})
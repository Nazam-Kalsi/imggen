import { ApiErr } from "../utils/apiErr";
import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";
import {imageGeneration, trainModel} from "commontypes/types"
import {prismaClient} from 'db'

export const trainAiModel = handler(async(req,res,next)=>{
    const data = trainModel.safeParse(req.body);
    if(!data.success) return next(new ApiErr(400,data.error.message));

    const trainModelData = await prismaClient.trainAiModel.create({
        data:{
            name:data.data.name,
            type:data.data.type,
            ethinicity:data.data.ethinicity,
            eyeColor:data.data.eyeColor,
            bald:data.data.bald,
            images:data.data.images,
            userId:req.user.id ?? "123"
        }
    })

    if(!trainModelData) return next(new ApiErr(500,"Failed to train model."));
    return res.status(200).json(ApiRes(200,"Success",{data:trainModelData.id}))
})

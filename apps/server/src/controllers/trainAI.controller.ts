import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";
import {trainModel} from "commontypes/types"

export const trainAiModel = handler(async(req,res,next)=>{
    return res.status(200).json(ApiRes(200,"Success"))
})


export const generateAiImagesFromModel = handler(async(req,res,next)=>{
    return res.status(200).json(ApiRes(200,"Success"))
})
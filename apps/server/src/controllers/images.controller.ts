import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";
import {imageGeneration,imageGenerationFromPack} from "commontypes/types"
import {prismaClient} from 'db'

export const getImages = handler(async(req,res,next)=>{
    return res.status(200).json(ApiRes(200,"Success"))
})

import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";
import {imageGenerationFromPack} from "commontypes/types"
import {prismaClient} from 'db'

export const createPack = handler(async(req,res,next)=>{
    return res.status(200).json(ApiRes(200,"Success"))
})


export const getPacks = handler(async(req,res,next)=>{
    return res.status(200).json(ApiRes(200,"Success"))
})
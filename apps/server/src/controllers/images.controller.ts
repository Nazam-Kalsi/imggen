import { ApiErr } from "../utils/apiErr";
import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";
import {imageGeneration,imageGenerationFromPack} from "commontypes/types"
import {prismaClient} from 'db'

export const getImages = handler(async(req,res,next)=>{
    const page= parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const skip = (page - 1) * pageSize;

    const [images,totalImages] = await Promise.all([
        prismaClient.outputImages.findMany({
            where:{
                userId:req.user.id
            },
            skip,
            take: pageSize,
            orderBy: {
                createdAt: 'desc'
            }
        }),
        prismaClient.outputImages.count()
    ]);
    const totalPages = Math.ceil(totalImages / pageSize);

    return res.status(200).json(ApiRes(200,"Success",{data:{images,page,pageSize,totalImages,totalPages}}))
})


export const generateAiImagesFromModel = handler(async(req,res,next)=>{
    const data = imageGeneration.safeParse(req.body);
    if(!data.success) return next(new ApiErr(400,data.error.message));

    const generatedImage = await prismaClient.generateAiImagesFromModel.create({
        date:{
            prompt:data.data.prompt,
            modelId:req.user.id,
            userId:req.user.id ?? "123",
            imageUrl: "https://picsum.photos/200"
        }
    })
    return res.status(200).json(ApiRes(200,"Success",{date:generatedImage.id}))
})

export const generateAiImagesFromPack = handler(async(req,res,next)=>{
    const data = imageGenerationFromPack.safeParse(req.body);
    if(!data.success) return next(new ApiErr(400,data.error.message));

    const prompts = await prismaClient.prompts.find({
        where: {
            packId: data.data.packId,
        }
    })

    const generatedImage = await prismaClient.generateAiImagesFromPack.createManyAndReturn({
        date: prompts.map((x:string)=>{
                return ({
                modelId:data.data.modelId,
                prompt:x,
                userId:req.user.id ?? "123",
                imageUrl: "https://picsum.photos/200"})
            })
        
    })
    return res.status(200).json(ApiRes(200,"Success",{data:generatedImage.map((x:any)=>x.id)}))
})


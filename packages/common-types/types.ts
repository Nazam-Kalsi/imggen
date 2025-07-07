import {z} from 'zod';

const model = {
    eyeColor: ["blue","green","brown","black","gray","hazel","amber","pink","red","yellow","turquoise","violet"],
    ethinicity: ['white', 'nigga', 'chinese'],
    type: ['man', 'woman', 'other']
} as const


export const trainModel = z.object({
    name:z.string().min(3,{message:"Name is required."}),
    type:z.enum(model.type),
    ethinicity:z.enum(model.ethinicity),
    eyeColor:z.enum(model.eyeColor),
    bald:z.boolean(),
    // images:z.array(z.string()).min(10,{message:"Atleast 10 images are required."}),
    zipUrl:z.string()
})

export const imageGeneration = z.object({
    prompt:z.string().min(3,{message:"Prompt is required."}),
    modelId:z.string(),
    

})
export const imageGenerationFromPack = z.object({
    modelId:z.string(),
    packId:z.string(),
})
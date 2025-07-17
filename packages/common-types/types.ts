import {z} from 'zod';

export const model = {
    eyeColor: ["blue","green","brown","black","gray","hazel","amber","pink","red","yellow","turquoise","violet"],
    ethinicity: ['white', 'nigga', 'chinese'],
    type: ['man', 'woman', 'other'],
    isBald:['true','false']
} as const


export const trainModel = z.object({
    name:z.string().min(3,{message:"Name is required."}),
    type: z.union([z.literal(""), z.enum(model.type)]).refine(val => val !== "", {
    message: "Type is required.",
  }),
  ethinicity: z.union([z.literal(""), z.enum(model.ethinicity)]).refine(val => val !== "", {
    message: "Ethinicity is required.",
  }),
  eyeColor: z.union([z.literal(""), z.enum(model.eyeColor)]).refine(val => val !== "", {
    message: "Eye color is required.",
  }),
    bald: z.union([z.literal(""), z.enum(model.isBald)]).refine(val => val !== "", {
    message: "is model bald.",
  }),
    images:z.array(z.string()).min(1,{message:"Atleast 4 images are required."}),
    // zipUrl:z.string()
})

export const imageGeneration = z.object({
    prompt:z.string().min(3,{message:"Prompt is required."}),
    modelId:z.string(),
    

})
export const imageGenerationFromPack = z.object({
    modelId:z.string(),
    packId:z.string(),
})
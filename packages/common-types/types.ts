import {z} from 'zod';

export const model = {
    eyeColor: ["blue","green","brown","black","gray","hazel","amber","pink","red","yellow","turquoise","violet"],
    ethinicity: ['white', 'nigga', 'chinese'],
    type: ['man', 'woman', 'other'],
    isBald:['true','false']
} as const

const browserFileSchema = z.array(z.instanceof(File)).min(4, {
  message: "At least 4 images are required.",
});

const multerFileSchema = z.array(
  z.object({
    originalname: z.string(),
    mimetype: z.string(),
    buffer: z.instanceof(Buffer),
    size: z.number(),
  })
).min(4, {
  message: "At least 4 images are required.",
});

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
  //TODO: want file here
   images: browserFileSchema.or(multerFileSchema),
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

export const signUpSchema = z.object({
  userName:z.string().min(3, { message: "Username is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
})
export const signInSchema = z.object({
  identifier:z.string().min(3, { message: "Username is required." }),
  password: z.string().min(8, { message: "Password is required." }),
})


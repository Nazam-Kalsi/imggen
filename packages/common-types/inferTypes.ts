import { z } from "zod";
import {imageGeneration,imageGenerationFromPack,model, trainModel} from "./types"

export type modelTypes = z.infer<typeof trainModel >;
export type imageGenerationTypes = z.infer<typeof imageGeneration>;
export type imageGenerationFromPackTypes = z.infer<typeof imageGenerationFromPack>;

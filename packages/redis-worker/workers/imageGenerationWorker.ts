import { createRedisClient } from "redis-client";
import type { taskT } from "./modelTrainWorker";
import { InferenceClient } from "@huggingface/inference";

const redisClient = createRedisClient();
const client = new InferenceClient(process.env.HF_TOKEN);


async function imageGenerationWorker() {
  console.log("🚀 Image generation Worker is running...");
  while (true) {
    const res = await redisClient.blpop("imageGeneration", 0);
    const task = JSON.parse(res?.[1] ?? "{}");
    await processImageGenerationTask(task);
  }
}
async function processImageGenerationTask(task: taskT) {
  try{
    console.log("waiting for 5 sec...");
    // await new Promise(resolve => setTimeout(resolve, 10000)); //10 sec wait
    const url = await client.textToImage({
      model: "stabilityai/stable-diffusion-2",
      inputs: task.payload.prompt,
      parameters: {
        negative_prompt: "blurry",
        width: 512,
        height: 512,
        guidance_scale: 7.5
      }
    });

    //TODO: api call to AI image generation service -- 💸as paid for now💸 
    const res = await fetch(task.callbackUrl,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "success", generatedImageId: task.payload.generatedImageId,imageUrl : "https://picsum.photos/200" }),
    });
    console.log("Image processed!")
  }catch(err){
 const res = await fetch(task.callbackUrl,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "failed", generatedImageId: task.payload.generatedImageId }),
    });
  }
}

export default imageGenerationWorker;
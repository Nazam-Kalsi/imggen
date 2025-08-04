import { createRedisClient } from "redis-client";
import type { taskT } from "./modelTrainWorker";

const redisClient = createRedisClient();


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
    await new Promise(resolve => setTimeout(resolve, 10000)); //10 sec wait

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
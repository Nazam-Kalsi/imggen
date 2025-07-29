import { createRedisClient } from "redis-client";

const redisClient = createRedisClient();

export const imageGenFromPackWorker = async()=>{
    console.log("🚀 Image generation Worker is running...");
    try {
        while (true) {
    const res = await redisClient.blpop("imageGenerationFromPack", 0);
    const task = JSON.parse(res?.[1] ?? "{}");
    await processImageGenerationTask(task);
  }
    } catch (error) {
        console.log(error);
    }
}

const processImageGenerationTask = async (task:any)=>{
try{
    console.log("waiting for 10 sec...");
    await new Promise(resolve => setTimeout(resolve, 10000)); //10 sec
    let data=[];
    for(let i =0;i<task.payload.prompts.length;i++){
      data.push({
        prompt:task.payload.prompts[i],
        imageUrl:"https://picsum.photos/200",
        userId:task.payload.userId,
        modelId:task.payload.modelId,
        dbId:task.payload.dbIds[i]
      })
    }
   
    //TODO: api call to AI image generation service -- 💸as paid for now💸 
    const res = await fetch(task.callbackUrl,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "success", data }),
    });
    console.log("Image processed!")
  }catch(err){
 const res = await fetch(task.callbackUrl,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "failed", data:"" }),
    });
  }
}
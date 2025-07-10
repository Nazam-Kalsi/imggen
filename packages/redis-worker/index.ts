import {redisClient} from "redis-client"

async function startWorker() {
  console.log("🚀 Worker is running...");

  while (true) {
    const result = await redisClient.blpop('trainModel', 0);
    const task = JSON.parse(result?.[1] ?? '{}');

    console.log("task:", task);
    await processTask(task);
  }
}

async function processTask(task:any) {

  console.log(`⚙️ Processing task ${task.type}`);
  await new Promise((r) => setTimeout(r, 2000));
  console.log(`✅ Done with task ${task.type}`);

 const req =  await fetch(task.callbackUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: "success",modelId:task.payload.modelId })
});
console.log(req);
}

startWorker();
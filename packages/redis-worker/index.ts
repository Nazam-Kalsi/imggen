import {redisClient} from "redis-client"

async function startWorker() {
  console.log("🚀 Worker is running...");

  while (true) {
    const result = await redisClient.blpop('trainModel', 0); // blocks until task available
    const task = JSON.parse(result?.[1] ?? '{}');

    console.log("task:", task);
    await processTask(task);
  }
}

async function processTask(task:any) {

  console.log(`⚙️ Processing task ${task.taskId}`);
  await new Promise((r) => setTimeout(r, 2000));
  console.log(`✅ Done with task ${task.taskId}`);

  await fetch(task.callbackUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: "done" })
});
}

startWorker();
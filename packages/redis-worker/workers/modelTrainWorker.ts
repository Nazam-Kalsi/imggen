import { createRedisClient } from "redis-client";
import { v2 as cloudinary } from "cloudinary";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import archiver from "archiver";

const redisClient = createRedisClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type imageT = {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export type taskT = {
  type: string;
  payload: {
    modelId: string;
    [key: string]: any;
  };
  callbackUrl: string;
};

const downloadImages = async (
  imageUrl: imageT,
  ImagePath: string,
  modelId: string
) => {
  const baseDir = path.join(__dirname, "temp", modelId);
  const filePathWithOutExtension = path.join(baseDir, ImagePath);

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  const extension = path.extname(imageUrl.originalname);
  const filePath = `${filePathWithOutExtension}${extension}`;
  const realBuffer = Buffer.from(imageUrl.buffer.data);
  fs.writeFileSync(filePath, realBuffer);
};

async function zipFolder(
  sourceFolder: string,
  outPath: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => resolve(outPath));
    archive.on("error", (err) => reject(err));

    archive.pipe(output);
    archive.directory(sourceFolder, false);
    archive.finalize();
  });
}

async function uploadZipToCloudinary(filePath: string): Promise<any> {
  const byteArrayBuffer = fs.readFileSync(filePath);
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "imggen", resource_type: "raw" },
        (error, uploadResult) => {
          if (error) {
            console.log("cloudinary error : ", error);
            resolve(null);
          }
          return resolve(uploadResult);
        }
      )
      .end(byteArrayBuffer);
    // cloudinary.uploader.upload(filePath,{
    //     folder: "imggen",
    //     resource_type: "auto",
    //   },
    //   (error, uploadResult) => {
    //     if (error) {
    //       console.log("cloudinary error : ", error);
    //       resolve(null);
    //     }
    //     return resolve(uploadResult);
    //   }
    // );
  });
  return uploadResult;
}

async function modelTrainingWorker() {
  console.log("🚀 Worker is running...");

  while (true) {
    const result = await redisClient.blpop("trainModel", 0);
    const task = JSON.parse(result?.[1] ?? "{}");
    await processTask(task);
  }
}

async function processTask(task: taskT) {
  console.log(`⚙️ Processing task ${task.type}`);
  (task.payload.images as imageT[]).forEach(async (url, index) => {
    const path = `image_${index + 1}`;
    downloadImages(url, path, task.payload.modelId);
  });

  const dirPath = `${__dirname}/temp/${task.payload.modelId}`;

  const zipDirPath = await zipFolder(dirPath, `${dirPath}.zip`);
  console.log("✅ Zipped to:", zipDirPath);

  const uploadResult = await uploadZipToCloudinary(zipDirPath);

  if (uploadResult) {
    fs.unlinkSync(zipDirPath);
    fs.rmSync(dirPath, { recursive: true, force: true });
    const req = await fetch(task.callbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "success",
        modelId: task.payload.modelId,
        url: uploadResult.secure_url,
      }),
    });
  } else {
    const req = await fetch(task.callbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "failed", modelId: task.payload.modelId }),
    });
  }
  // const req = await fetch(task.callbackUrl, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     status: "success",
  //     modelId: task.payload.modelId,
  //   }),
  // });
  console.log("Done");
}

export default modelTrainingWorker;
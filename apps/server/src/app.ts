import express from 'express';
import { errorHandlerMiddleware } from './middleware/errorHandler.middleware';
import { clerkMiddleware } from '@clerk/express'
import cors from "cors";
const app = express();


const corsOptions={
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(clerkMiddleware());

import trainModel from "./routes/trainModel.route"
app.use('/api/model',trainModel);

import workerRes from "./routes/worker.route"
app.use("/api/webhook",workerRes);

import authRouter from "./routes/user.route"
app.use("/api/auth",authRouter);

import promptPackRouter from "./routes/pack.route"
app.use("/api/pack",promptPackRouter);

import imageRouter from "./routes/image.route"
app.use("/api/image",imageRouter);

app.use(errorHandlerMiddleware);

export default app;

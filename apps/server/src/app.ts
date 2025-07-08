import express from 'express';
import { errorHandlerMiddleware } from './middleware/errorHandler.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

import trainModel from "./routes/trainModel.route"
app.use('/api/train',trainModel);

import workerRes from "./routes/worker.route"
app.use(workerRes);


app.use(errorHandlerMiddleware);

export default app;

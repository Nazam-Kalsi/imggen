import express from 'express';
import { errorHandlerMiddleware } from './middleware/errorHandler.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

import trainModel from "./routes/trainModel.router"
app.use('/api/train',trainModel);


app.use(errorHandlerMiddleware);

export default app;

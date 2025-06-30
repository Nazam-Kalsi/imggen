import express from 'express';
import { errorHandlerMiddleware } from './middleware/errorHandler.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(errorHandlerMiddleware);



export default app;

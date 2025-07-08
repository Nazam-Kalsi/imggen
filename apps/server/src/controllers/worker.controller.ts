import { handler } from "../utils/handler";

export const workerResponse = handler(async(req,res,next)=>{
    console.log(req.data);
    return;
})
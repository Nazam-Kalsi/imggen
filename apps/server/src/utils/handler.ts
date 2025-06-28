import type { NextFunction, Request,Response } from "express"
import { ApiErr } from "./apiErr";


type AsyncHandler = (req:any, res: Response, next: NextFunction) => Promise<any>;

export const handler =(fxn:AsyncHandler)=>{
    return async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try{
            await fxn(req,res,next);
        }catch(error){
             if (error instanceof Error) {
                console.error("Error occurred in handler:", error);
                next(new ApiErr(500, `Internal server error, ${error.message}`));
                return;
              } else {
                console.error("Unknown error occurred in handler:", error);
                next(new ApiErr(500, "Internal server error"));
              }
        }
    }
}
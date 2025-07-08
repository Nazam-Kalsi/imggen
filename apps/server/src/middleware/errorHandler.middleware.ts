import { ApiErr } from "../utils/apiErr";
import { ApiRes } from "../utils/ApiRes";

export const errorHandlerMiddleware = (err:any, req:any, res:any, next:any) => {
  if (err instanceof ApiErr) 
   {
    return res.status(err.statusCode).json({
        message: err.message,
        error: err.errors,
      });
    }
      
   return res.status(500).json({
    message: "Something went wrong!",
    error: err.message || err,
  });
};

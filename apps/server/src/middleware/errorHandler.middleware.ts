import { ApiErr } from "../utils/apiErr";
import { ApiRes, type ApiResResponseT } from "../utils/ApiRes";

export const errorHandlerMiddleware = (res:any, err:any) => {
  if (err instanceof ApiErr) 
    return res
      .status(err.statusCode)
      .json(ApiRes({ statusCode: err.statusCode, message: err.message }));
  
  return res.status(500).json({
    message: "Something went wrong!",
    error: err.message || err,
  });
};

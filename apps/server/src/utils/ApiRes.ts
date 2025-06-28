import type { apiResT } from "../types/types";

export const ApiRes = (statusCode:number,message:string,data?:any):apiResT => {
    return({statusCode,success:statusCode<250,message,data});
}
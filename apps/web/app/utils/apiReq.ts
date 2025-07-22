import axios, { isAxiosError } from "axios"
import { toast } from "sonner";

export const apiReq = async(url:string, method:string,token?:any, body?:any)=>{
    try {
        const res = await axios({
            method:method.toUpperCase(),
            url:`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
            data:body,
            headers:{
                // "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }            
        })
        // console.log(res);
        return {res,success:true}
    } catch (error) {
        const axiosErr = isAxiosError(error);
        if(axiosErr){
            toast.error(error.response?.data.message || "Error occur");
            return {res:error.response?.data.message,success:false}
        }else{
            toast.error("Error while sending request, please log-in again.")
            return {res:"Error while sending request, please log-in again.",success:false}
        }        
    }
} 
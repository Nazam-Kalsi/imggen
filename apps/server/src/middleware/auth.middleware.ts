import type { NextFunction, Request, Response } from "express";
import { ApiErr } from "../utils/apiErr";
import jwt from 'jsonwebtoken';
import {clerkClient} from "@clerk/express"


declare global {
  namespace Express {
    interface Request {
        id:string,
      user?: {[key:string]:string};
    }
  }
}


export const authMid = async (req:Request, res:Response, next:NextFunction) => {
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];
  if (!token) return next(new ApiErr(400, "Unauthorised"));
  // const publicKey = (process.env.CLERK_PEM_PUBLIC_KEY);
  const publicKey = process.env.CLERK_PEM_PUBLIC_KEY?.replace(/\\n/g, "\n");
  if(!publicKey) return next(new ApiErr(500, "Public key not found"));
const decodedToken = jwt.verify(token, publicKey!, { algorithms: ["RS256"] }); 
 console.log(decodedToken);
  if(!decodedToken) return next(new ApiErr(400, "Invalid token payload"));
  const user = await clerkClient.users.getUser((decodedToken?.sub as string));
  console.log(user);
  const userInfo = {
    id:user.id,
    avatar:user.imageUrl,
    userName:(user.username as string),
    email:(user.emailAddresses[0]?.emailAddress as string)
  }
  req.user = userInfo;
  next();
};

import { prismaClient } from "db";
import { ApiErr } from "../utils/apiErr";
import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";

export const getCurrectUser = handler(async (req, res, next) => {
  const user = req.user;
  if(!user) return next(new ApiErr(400, "Unauthorised"));
  res.status(200).json(ApiRes(200, "yeat",user));
});

export const createUser = handler(async (req, res, next) => { 
  const data = req.body.data;
  // console.log(`Received webhook: ${JSON.stringify(req.body.data, null,2)}`);
  
  // const userId = data.id;
  // const user = await clerkClient.users.getUser(userId); 
    const dataToSaveInDb = {
        id: data.id,
        email: data.email_addresses[0].email_address,
        userName: data.username,
        avatarUrl: data.profile_image_url,
    };
    await prismaClient.user.create({data: dataToSaveInDb});
    return res.send('Webhook received');
});

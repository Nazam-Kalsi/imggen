import { ApiErr } from "../utils/apiErr";
import { ApiRes } from "../utils/ApiRes";
import { handler } from "../utils/handler";

export const getCurrectUser = handler(async (req, res, next) => {
  const user = req.user;
  if(!user) return next(new ApiErr(400, "Unauthorised"));
  res.status(200).json(ApiRes(200, "yeat",user));
});

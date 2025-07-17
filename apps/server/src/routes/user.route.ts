import { Router } from "express";
import { getCurrectUser } from "../controllers/user.controller";
import { authMid } from "../middleware/auth.middleware";

const router = Router();

router.route('/get-current-user').get(authMid,getCurrectUser)

export default router;
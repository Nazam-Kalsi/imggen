import { Router } from "express";
import { getCurrectUser, createUser } from "../controllers/user.controller";
import { authMid } from "../middleware/auth.middleware";

const router = Router();

router.route('/get-current-user').get(authMid,getCurrectUser)
router.route('/webhook/create-user').post(createUser)

export default router;
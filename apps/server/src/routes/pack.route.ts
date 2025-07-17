import { Router } from "express";
import { createPack,getPacks } from "../controllers/pack.controller";
import { authMid } from "../middleware/auth.middleware";

const router = Router();

router.route('/get-packs').get(authMid,getPacks);
router.route('/create-pack').post(authMid,createPack);

export default router;
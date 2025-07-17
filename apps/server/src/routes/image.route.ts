import { Router } from "express";
import { generateAiImagesFromModel,generateAiImagesFromPack,getImages } from "../controllers/images.controller";
import { authMid } from "../middleware/auth.middleware";

const router = Router();

router.route('/get-current-user').get(authMid,getImages);
router.route('/generate-images').post(authMid,generateAiImagesFromModel)
router.route('/generate-images-from-pack').post(authMid,generateAiImagesFromPack)

export default router;
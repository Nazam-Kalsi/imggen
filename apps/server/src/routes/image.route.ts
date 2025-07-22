import { Router } from "express";
import { generateAiImagesFromModel,generateAiImagesFromPack,getImages,getImagesById } from "../controllers/images.controller";
import { authMid } from "../middleware/auth.middleware";

const router = Router();

router.route('/get-user-images').get(authMid,getImages);
router.route('/get-image/:imageId').get(authMid,getImagesById);
router.route('/generate-image').post(authMid,generateAiImagesFromModel)
router.route('/generate-images-from-pack').post(authMid,generateAiImagesFromPack)

export default router;
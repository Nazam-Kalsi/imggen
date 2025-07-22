import {getModelById, trainAiModel,getAllModels} from "../controllers/trainModel.controller"
import { Router } from "express"
import { authMid } from "../middleware/auth.middleware";
import { upload } from "../utils/multer";

const router = Router();

//need to apply auth -D
router.route('/train-model').post(authMid,upload.array('images'),trainAiModel);
router.route('/get-model').post(authMid,getModelById);
router.route('/get-all-model').get(authMid,getAllModels);

export default router;

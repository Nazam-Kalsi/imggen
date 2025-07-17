import {getModelById, trainAiModel} from "../controllers/trainModel.controller"
import { Router } from "express"
import { authMid } from "../middleware/auth.middleware";

const router = Router();

//need to apply auth -D
router.route('/train-model').post(authMid,trainAiModel);
router.route('/get-model').post(authMid,getModelById);

export default router;

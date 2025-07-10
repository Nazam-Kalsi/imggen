import {getModelById, trainAiModel} from "../controllers/trainModel.controller"
import { Router } from "express"

const router = Router();

//need to apply auth
router.route('/train-model').post(trainAiModel);
router.route('/get-model').post(getModelById);

export default router;

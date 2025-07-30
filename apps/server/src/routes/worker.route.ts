import {trainModelResult,imageGenerationResult,imageGenerationFromPackResult} from "../controllers/worker.controller"
import { Router } from "express"

const router = Router();

//need to apply auth
router.route('/train-model-result').post(trainModelResult);
router.route('/generate-image-result').post(imageGenerationResult);
router.route('/generate-image-from-pack-result').post(imageGenerationFromPackResult);

export default router;

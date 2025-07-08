import {workerResponse} from "../controllers/worker.controller"
import { Router } from "express"

const router = Router();

//need to apply auth
router.route('/train-model-result').post(workerResponse);

export default router;

import { Router } from "express";
import { authenticateUser } from "../middlewares";

import * as RequestController from "../controllers/request.controller";

const router = Router();

router.post('/guide', authenticateUser, RequestController.requestGuide);
router.post('/temple', RequestController.requestTemple);

export default router;
import { Router } from "express";

import * as RefundController from "../controllers/refund.controller";

const router = Router();

router.get('/', RefundController.refundRequest);

export default router;
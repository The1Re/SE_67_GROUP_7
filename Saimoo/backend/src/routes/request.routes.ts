import { Router } from "express";
import { authenticateUser, authorizeRoles } from "../middlewares";

import * as RequestController from "../controllers/request.controller";

const router = Router();

router.post('/guide', authenticateUser, RequestController.requestGuide);
router.post('/temple', RequestController.requestTemple);

router.get('/', authenticateUser, authorizeRoles('admin'), RequestController.getRequests);
router.patch('/approve/guide/:id', authenticateUser, authorizeRoles('admin'), RequestController.approveRequestGuide);
router.patch('/approve/temple/:id', authenticateUser, authorizeRoles('admin'), RequestController.approveRequestTemple);
router.patch('/reject/:id', authenticateUser, authorizeRoles('admin'), RequestController.rejectRequest);

export default router;
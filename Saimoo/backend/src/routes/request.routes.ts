import { Router } from "express";
import { authenticateUser, authorizeRoles } from "../middlewares";

import * as RequestController from "../controllers/request.controller";

const router = Router();

router.post('/guide', authenticateUser, RequestController.requestGuide);
router.post('/temple', RequestController.requestTemple);

router.get('/', authenticateUser, authorizeRoles('admin'), RequestController.getRequests);
router.patch('/approve/:id', authenticateUser, authorizeRoles('admin'), RequestController.approveRequest);
router.patch('/reject/:id', authenticateUser, authorizeRoles('admin'), RequestController.rejectRequest);

export default router;
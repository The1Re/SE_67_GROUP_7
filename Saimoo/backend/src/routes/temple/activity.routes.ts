import { Router } from "express";

import * as TempleActivityController from "../../controllers/temple/templeActivity.controller";

const router = Router();

router.post('/', TempleActivityController.createTempleActivityController);
router.get('/', TempleActivityController.getTempleActivityController);
router.get('/:activityId', TempleActivityController.getTempleActivityByIdController);
router.put('/', TempleActivityController.updateTempleActivityController);
router.delete('/', TempleActivityController.deleteTempleActivityController);

export default router;
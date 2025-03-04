import { Router } from "express";

import * as TempleCharmController from "../../controllers/temple/templeCharm.controller";

const router = Router();

router.get('/', TempleCharmController.getTempleCharmController)
router.get('/:charmId', TempleCharmController.getTempleCharmByIdController)
router.post('/', TempleCharmController.newTempleCharmController);
router.put('/', TempleCharmController.updateTempleCharmController);
router.delete('/', TempleCharmController.deleteTempleCharmController);

export default router;
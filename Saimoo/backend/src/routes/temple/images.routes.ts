import { Router } from "express";

import * as TempleImageController from "../../controllers/temple/templeImage.controller";

const router = Router();

router.post('/', TempleImageController.newTempleImageController);
router.get('/', TempleImageController.getTempleImageController);
router.get('/:imageId', TempleImageController.getTempleImageByIdController);
router.put('/', TempleImageController.updateTempleImageController);
router.delete('/', TempleImageController.deleteTempleImageController);

export default router;
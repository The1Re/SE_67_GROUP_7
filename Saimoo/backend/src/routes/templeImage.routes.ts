import { Router } from 'express';
import { newTempleImageController,getTempleImageController } from '../controllers/templeImage.controller';
const router = Router();

router.post('/newImgTemple', newTempleImageController);
router.get('/showImgTemple', getTempleImageController);

export default router;
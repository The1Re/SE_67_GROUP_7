import { Router } from 'express';
import { newTempleImageController } from '../controllers/newTempleImage.controller';
const router = Router();

router.post('/a', newTempleImageController);

export default router;
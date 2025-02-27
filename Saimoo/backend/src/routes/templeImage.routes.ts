import { Router } from 'express';
import { newTempleImageController,getTempleImageController,updateTempleImageController,deleteTempleImageController,getTempleImageByIdController } from '../controllers/templeImage.controller';
const router = Router();

router.post('/create', newTempleImageController);
router.get('/show', getTempleImageController);
router.get('/:id',getTempleImageByIdController);
router.put('/update', updateTempleImageController);
router.delete('/delete', deleteTempleImageController);

export default router;
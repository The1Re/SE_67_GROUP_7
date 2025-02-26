import { Router } from 'express';
import { newTempleImageController,getTempleImageController,updateTempleImageController,deleteTempleImageController,getTempleImageByIdController } from '../controllers/templeImage.controller';
const router = Router();

router.post('/newImgTemple', newTempleImageController);
router.get('/showImgTemple', getTempleImageController);
router.get('/getOneImgTemple/:id',getTempleImageByIdController);
router.put('/updateImgTemple', updateTempleImageController);
router.delete('/deleteImgTemple', deleteTempleImageController);

export default router;
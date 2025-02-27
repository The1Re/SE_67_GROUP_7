import { Router } from 'express';
import { newTempleCharmController ,getTempleCharmController,updateTempleCharmController,deleteTempleCharmController,getTempleCharmByIdController} from '../controllers/templeCharm.controller';

const router = Router();

router.post('/create', newTempleCharmController);
router.get('/show', getTempleCharmController);
router.get('/getOne/:id',getTempleCharmByIdController);
router.put('/update', updateTempleCharmController);
router.delete('/delete', deleteTempleCharmController);


export default router;
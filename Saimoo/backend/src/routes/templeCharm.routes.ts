import { Router } from 'express';
import { newTempleCharmController ,getTempleCharmController,updateTempleCharmController,deleteTempleCharmController,getTempleCharmByIdController} from '../controllers/templeCharm.controller';

const router = Router();

router.post('/newCharmTemple', newTempleCharmController);
router.get('/showCharmTemple', getTempleCharmController);
router.get('/getOneCharmTemple/:id',getTempleCharmByIdController);
router.put('/updateCharmTemple', updateTempleCharmController);
router.delete('/deleteCharmTemple', deleteTempleCharmController);


export default router;
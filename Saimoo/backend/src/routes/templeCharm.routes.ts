import { Router } from 'express';
import { newTempleCharmController ,getTempleCharmController,updateTempleCharmController,deleteTempleCharmController} from '../controllers/templeCharm.controller';

const router = Router();

router.post('/newCharmTemple', newTempleCharmController);
router.get('/showCharmTemple', getTempleCharmController);
router.put('/updateCharmTemple', updateTempleCharmController);
router.delete('/deleteCharmTemple', deleteTempleCharmController);


export default router;
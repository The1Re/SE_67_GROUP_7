import { Router } from 'express';
import { newTempleCharmController ,getTempleCharmController} from '../controllers/templeCharm.controller';

const router = Router();

router.post('/newCharmTemple', newTempleCharmController);
router.get('/showCharmTemple', getTempleCharmController);

export default router;
import { Router } from 'express';
import { newTempleCharmController  } from '../controllers/newTempleCharm.controller';

const router = Router();

router.post('/a', newTempleCharmController);

export default router;
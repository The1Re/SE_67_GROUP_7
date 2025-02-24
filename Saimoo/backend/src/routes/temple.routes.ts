import { Router } from 'express';
import { createTempleController,getTempleController  } from '../controllers/templeCreate.controller';

const router = Router();

router.post('/createTemple', createTempleController);
router.get('/showTemple', getTempleController);

export default router;
import { Router } from 'express';
import { createTempleController  } from '../controllers/createTemple.controller';

const router = Router();

router.post('/a', createTempleController);

export default router;
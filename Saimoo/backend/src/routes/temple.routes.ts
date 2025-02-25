import { Router } from 'express';
import { createTempleController,getTempleController,updateTempleController,deleteTempleController,getTempleByIdController  } from '../controllers/templeMenage.controller';

const router = Router();

router.post('/createTemple', createTempleController);
router.get('/showTemple', getTempleController);
router.get('/getOneTemple',getTempleByIdController)
router.put('/updateTemple', updateTempleController);
router.delete('/deleteTemple', deleteTempleController);

export default router;
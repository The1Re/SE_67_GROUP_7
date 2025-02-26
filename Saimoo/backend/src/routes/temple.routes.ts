import { Router } from 'express';
import { createTempleController,getTempleController,updateTempleController,deleteTempleController,getTempleByIdController,getTempleByProvinceIdController  } from '../controllers/templeMenage.controller';

const router = Router();

router.post('/createTemple', createTempleController);
router.get('/showTemple', getTempleController);
router.get('/getOneTemple/:id',getTempleByIdController);
router.get('/getTempleByProvinceId/:provinceId', getTempleByProvinceIdController);
router.put('/updateTemple', updateTempleController);
router.delete('/deleteTemple', deleteTempleController);

export default router;
import { Router } from 'express';
import { createTempleController,getTempleController,updateTempleController,deleteTempleController,getTempleByIdController,getTempleByProvinceIdController  } from '../controllers/templeMenage.controller';

const router = Router();

router.post('/create', createTempleController);
router.get('/show', getTempleController);
router.get('/:id',getTempleByIdController);
router.get('/:provinceId', getTempleByProvinceIdController);
router.put('/update', updateTempleController);
router.delete('/delete', deleteTempleController);

export default router;
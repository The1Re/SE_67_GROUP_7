import { Router } from 'express';
import * as ProvinceController from '../controllers/province.controller';

const router = Router();

router.get('/', ProvinceController.getAllProvinceController);

export default router;
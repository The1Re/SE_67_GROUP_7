import { Router } from 'express';
import TempleImageRoutes from './images.routes';
import TempleCharmRoutes from './charm.routes';
import TempleActivityRoutes from './activity.routes';

import * as TempleController from '../../controllers/temple/templeMenage.controller';

const router = Router();

router.post('/', TempleController.createTempleController); //
router.get('/', TempleController.getTempleController); //
router.get('/:locationId',TempleController.getTempleByIdController); //ใช้ locationId
router.put('/:templeId', TempleController.updateTempleController); //ใช้ templeId
router.delete('/:locationId', TempleController.deleteTempleController); //
router.put('/like/:templeId', TempleController.updateTempleLikeController); //ใช้ templeId บัคอยู่ +1 เรื่อยๆ

router.use('/:locationId/charms', TempleCharmRoutes);
router.use('/:locationId/activity', TempleActivityRoutes);
router.use('/:locationId/images', TempleImageRoutes); 

export default router;
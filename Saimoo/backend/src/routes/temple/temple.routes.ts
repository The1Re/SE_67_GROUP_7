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
router.put('/like/:templeId', TempleController.updateTempleLikeController); //ใช้ templeId  +1 
router.put('/unlike/:templeId', TempleController.deleteTempleLikeController); //ใช้ templeId ลบ -1 
router.put('/name/:locationId', TempleController.updateLocationController); //ใช้ locationId
router.get('/province', TempleController.getAllProvinceCotroler); //

router.use('/:locationId/charms', TempleCharmRoutes);
router.use('/:locationId/activity', TempleActivityRoutes);
router.use('/:locationId/images', TempleImageRoutes); 

export default router;
import { Router } from 'express';
import TempleImageRoutes from './images.routes';
import TempleCharmRoutes from './charm.routes';
import TempleActivityRoutes from './activity.routes';

import * as TempleController from '../../controllers/temple/templeMenage.controller';

const router = Router();

router.post('/', TempleController.createTempleController);
router.get('/', TempleController.getTempleController);
router.get('/:id',TempleController.getTempleByIdController);
router.put('/', TempleController.updateTempleController);
router.delete('/:id', TempleController.deleteTempleController);

router.use('/:id/charms', TempleCharmRoutes);
router.use('/:id/activity', TempleActivityRoutes);
router.use('/:id/images', TempleImageRoutes); 

export default router;
import { Router } from "express";
import authRoutes from './auth.routes';
import templeRoutes from './temple.routes'; 
import templeCharmRoutes from './templeCharm.routes';
import templeActivityRoutes from './templeActivity.routes';
import TempleImageRoutes from './templeImage.routes';

const routes = Router();

routes.use('/auth', authRoutes)
routes.use('/temple', templeRoutes)
routes.use('/templeCharm', templeCharmRoutes)
routes.use('/templeActivity', templeActivityRoutes)
routes.use('/templeImage', TempleImageRoutes)


export default routes;
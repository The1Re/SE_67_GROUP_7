import { Router } from "express";
import authRoutes from './auth.routes';
import tripRoutes from './trip.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/trips', tripRoutes)

export default routes;
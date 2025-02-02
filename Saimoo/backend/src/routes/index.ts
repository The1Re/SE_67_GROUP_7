import { Router } from "express";
import authRoutes from './auth.routes';

const routes = Router();

routes.use('/', authRoutes)

export default routes;
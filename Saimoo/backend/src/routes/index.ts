import { Router } from "express";
import { authenticateUser } from '../middlewares'

import authRoutes from './auth.routes';
import walletRoutes from './wallet.routes';
import tripRoutes from './trip.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/wallets', authenticateUser, walletRoutes);
routes.use('/trips', tripRoutes)

export default routes;
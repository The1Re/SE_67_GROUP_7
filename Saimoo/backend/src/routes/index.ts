import { Router } from "express";
import { authenticateUser } from '../middlewares'

import authRoutes from './auth.routes';
import walletRoutes from './wallet.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/wallets', authenticateUser, walletRoutes)

export default routes;
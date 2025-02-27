import { Router } from "express";
import { authenticateUser } from '../middlewares'
import { uploads } from '../middlewares'


import walletRoutes from './wallet.routes';
import tripRoutes from './trip.routes';
import requestRoutes from './request.routes';
import authRoutes from './auth.routes';
import templeRoutes from './temple.routes'; 
import templeCharmRoutes from './templeCharm.routes';
import templeActivityRoutes from './templeActivity.routes';
import TempleImageRoutes from './templeImage.routes';

const routes = Router();

routes.use('/auth', authRoutes)
routes.use('/temple', templeRoutes)
routes.use('/templeCh', templeCharmRoutes)
routes.use('/templeAc', templeActivityRoutes)
routes.use('/templeImg', TempleImageRoutes)
routes.use('/auth', authRoutes);
routes.use('/wallets', authenticateUser, walletRoutes);
routes.use('/trips', tripRoutes);
routes.use('/requests', requestRoutes)
routes.post('/upload', uploads.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', file: req.file });
});

export default routes;
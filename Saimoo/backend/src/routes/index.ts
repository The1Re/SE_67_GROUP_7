import { Router } from "express";
import { authenticateUser, authorizeRoles } from '../middlewares'
import { uploads } from '../middlewares'


import walletRoutes from './wallet.routes';
import tripRoutes from './trip.routes';
import requestRoutes from './request.routes';
import authRoutes from './auth.routes';
import templeRoutes from './temple/temple.routes'; 
import userRoutes from './user.routes';
import reviewRoutes from './reviewGuide.routes';
import provinceRoutes from './province.routes';

const routes = Router();

routes.use('/auth', authRoutes)
routes.use('/users', authenticateUser, authorizeRoles('admin'), userRoutes);
routes.use('/temples', templeRoutes)
routes.use('/auth', authRoutes);
routes.use('/wallets', authenticateUser, walletRoutes);
routes.use('/trips', tripRoutes);
routes.use('/requests', requestRoutes)
routes.post('/upload', uploads.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', file: req.file });
});
routes.use('/reviews', reviewRoutes);
routes.use('/provinces', provinceRoutes);


export default routes;
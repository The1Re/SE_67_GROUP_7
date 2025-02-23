import { Request, Response } from 'express';
import { createTempleCharm } from '../services/templeCharm.service';
import logger from '../utils/logger';
import type { User } from '@prisma/client';
import { AuthRequest } from '../middlewares/authenticateUser.middleware';

export const newTempleCharmController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { name, imagePath,price,avalibleDate,status,detail,templeId} = req.body;
        const templeCharm = await createTempleCharm({
            name, imagePath, price, avalibleDate, status, detail, templeId});
        return res.status(201).json(templeCharm);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
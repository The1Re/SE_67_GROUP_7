import { Request, Response } from 'express';
import { createTempleImage } from '../services/TempleImage.sevice';
import logger from '../utils/logger';
import type { User } from '@prisma/client';
import { AuthRequest } from '../middlewares/authenticateUser.middleware';

export const newTempleImageController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { templeId, imagePath ,description } = req.body;
        const templeImage = await createTempleImage({ templeId, imagePath ,description});
        return res.status(201).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
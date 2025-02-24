import { Request, Response } from 'express';
import { createTempleImage, getTempleImages } from '../services/temple.service';
import logger from '../utils/logger';
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

export const getTempleImageController = async (req: Request , res: Response): Promise<any> => {
    try {
        const templeImage = await getTempleImages();
        return res.status(201).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
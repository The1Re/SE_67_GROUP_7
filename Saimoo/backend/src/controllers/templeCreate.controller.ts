import { Request, Response } from 'express';
import { createTempleForNewtemple } from '../services/temple.service';
import logger from '../utils/logger';
import { AuthRequest } from '../middlewares/authenticateUser.middleware';
import { getLocationsTemple } from '../services/location.service';

export const createTempleController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { name, latitude, longitude, provinceId, description } = req.body;
        const temple = await createTempleForNewtemple({ name, latitude, longitude, provinceId, description });
        return res.status(201).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTempleController = async (req: Request, res: Response): Promise<any> => {
    try {
        const temples = await getLocationsTemple();
        return res.status(200).json(temples);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
import e, { Request, Response } from 'express';
import { createTempleActivity } from '../services/temple.service';
import logger from '../utils/logger';
import { AuthRequest } from '../middlewares/authenticateUser.middleware';
import { getLocationsTemple } from '../services/location.service';

export const createTempleActivityController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { name,description,startDate,endDate,imagePath,templeId } = req.body;
        const templeActivity = await createTempleActivity({
            name,description,startDate,endDate,imagePath,templeId
        });
        return res.status(201).json(templeActivity);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTempleActivityController = async (req: Request, res: Response): Promise<any> => {
    try {
        const temples = await getLocationsTemple();
        return res.status(200).json(temples);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


   
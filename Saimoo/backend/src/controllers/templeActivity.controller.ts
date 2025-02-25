import { Request, Response } from 'express';
import { createTempleActivity,getTempleActivities,updateTempleActivity,deleteTempleActivity } from '../services/temple.service';
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
        return res.status(500).json({ message: 'Can not create' });
    }
};

export const getTempleActivityController = async (req: Request, res: Response): Promise<any> => {
    try {
        const templeActivity = await getTempleActivities();
        return res.status(201).json(templeActivity);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const updateTempleActivityController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id,name,description,startDate,endDate,imagePath,templeId } = req.body;
        const templeActivity = await updateTempleActivity(id, {
            name,description,startDate,endDate,imagePath,templeId
        });
        return res.status(201).json(templeActivity);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not update' });
    }
};

export const deleteTempleActivityController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body;
        const templeActivity = await deleteTempleActivity(id);
        return res.status(201).json(templeActivity);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete' });
    }
};

   
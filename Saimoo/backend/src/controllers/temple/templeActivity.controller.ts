import { Request, Response } from 'express';
import { createTempleActivity,getTempleActivities,updateTempleActivity,deleteTempleActivity,getTempleActivitiesById } from '../../services/temple.service';
import logger from '../../utils/logger';
import { AuthRequest } from '../../middlewares/authenticateUser.middleware';
import { getLocationsTemple, getTempleIdFromLocationId } from '../../services/location.service';

export const createTempleActivityController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const locationId = req.locationId;
        const templeId = await getTempleIdFromLocationId(Number(locationId));
        const { name,description,startDate,endDate,imagePath } = req.body;
        const templeActivity = await createTempleActivity({name,description,startDate,endDate,imagePath},Number(templeId));
        return res.status(201).json(templeActivity);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not create' });
    }
};

export const getTempleActivityController = async (req: Request, res: Response): Promise<any> => {
    try {
        const locationId = req.locationId;
        if (!locationId) {
            return res.status(400).json({ message: 'Location ID is required' });
        }

        const templeId = await getTempleIdFromLocationId(Number(locationId));
        if (!templeId) {
            return res.status(404).json({ message: 'Temple not found' });
        }
        const templeActivity = await getTempleActivities(Number(templeId));
        return res.status(200).json(templeActivity);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const getTempleActivityByIdController = async (req: Request, res: Response): Promise<any> => {
    try {
        const locationId = req.locationId;
        if (!locationId) {
            return res.status(400).json({ message: 'Location ID is required' });
        }

        const templeId = await getTempleIdFromLocationId(Number(locationId));
        if (!templeId) {
            return res.status(404).json({ message: 'Temple not found' });
        }
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ message: "Invalid activity ID" });
        }

        const templeActivity = await getTempleActivitiesById(Number(id), Number(templeId));

        if (!templeActivity) {
            return res.status(404).json({ message: "Activity not found" }); 
        }

        return res.status(200).json(templeActivity);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Cannot get activity" });
    }
};

export const updateTempleActivityController = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ message: "Invalid activity ID" });
        }

        const { name, description, startDate, endDate, imagePath } = req.body;

        const updatedActivity = await updateTempleActivity(Number(id), {name,description,startDate,endDate,imagePath,});

        return res.status(200).json(updatedActivity);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Cannot update activity" });
    }
};

export const deleteTempleActivityController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const templeActivity = await deleteTempleActivity(Number(id));
        return res.status(201).json(templeActivity);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete' });
    }
};

   
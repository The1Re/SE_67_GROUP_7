import { Request, Response } from 'express';
import { createTempleForNewtemple,deleteTemple,updateTempleDescription } from '../services/temple.service';
import logger from '../utils/logger';
import { AuthRequest } from '../middlewares/authenticateUser.middleware';
import { getLocationsTemple,getLocationTempleById } from '../services/location.service';

export const createTempleController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { name, latitude, longitude, provinceId, description } = req.body;
        const temple = await createTempleForNewtemple({ name, latitude, longitude, provinceId, description });
        return res.status(201).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not create' });
    }
};

export const getTempleController = async (req: Request, res: Response): Promise<any> => {
    try {
        const temples = await getLocationsTemple();
        return res.status(200).json(temples);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get ' });
    }
};

export const getTempleByIdController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { locationId } = req.body;
        const temple = await getLocationTempleById(locationId);
        return res.status(200).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const updateTempleController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id, description } = req.body;
        const temple = await updateTempleDescription(id, { description });
        return res.status(200).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not update' });
    }
};

export const deleteTempleController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { locationId } = req.body;
        const temple = await deleteTemple(locationId);
        return res.status(200).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete' });
    }
};
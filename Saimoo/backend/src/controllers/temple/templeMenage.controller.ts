import { Request, Response } from 'express';
import { createTempleForNewtemple,deleteTemple,updateTempleDescription } from '../../services/temple.service';
import logger from '../../utils/logger';
import { AuthRequest } from '../../middlewares/authenticateUser.middleware';
import { getLocationsTemple,getLocationTempleById,getLocationTempleByProvinceId} from '../../services/location.service';

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
        const { page = '1', pageSize = '10', sortBy = 'id', sortOrder = 'desc' } = req.query;
        const pageNumber = parseInt(page as string) || 1;
        const size = parseInt(pageSize as string) || 10;

        const temples = await getLocationsTemple(pageNumber, size, sortBy as string, sortOrder as 'asc' | 'desc');
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

export const getTempleByProvinceIdController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { provinceId } = req.params;
        const temple = await getLocationTempleByProvinceId(Number(provinceId));
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
        const { id } = req.params;
        const temple = await deleteTemple(Number(id));
        return res.status(200).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete' });
    }
};
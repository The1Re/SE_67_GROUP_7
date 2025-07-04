import { Request, Response } from 'express';
import { createTempleForNewtemple,deleteTemple,deleteTempleLike,updateTempleDescription, updateTempleLike } from '../../services/temple.service';
import logger from '../../utils/logger';
import { AuthRequest } from '../../middlewares/authenticateUser.middleware';
import { getAllProvince, getLocationsTemple,getLocationTempleById,getLocationTempleByProvinceId, getTempleIdFromLocationId, updateLocation} from '../../services/location.service';

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
        const locationId = parseInt(req.params.locationId, 10);
        if (isNaN(locationId)) {
            return res.status(400).json({ message: "Invalid location ID" }); // ✅ ตรวจสอบ ID
        }

        const temple = await getLocationTempleById(locationId);

        if (!temple) {
            return res.status(404).json({ message: "Temple not found" }); // ✅ ถ้าไม่พบข้อมูล
        }

        return res.status(200).json(temple);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Cannot get temple" });
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
        const id = parseInt(req.params.templeId, 10);
        const {  description } = req.body;
        const temple = await updateTempleDescription(id , { description });
        return res.status(200).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not update' });
    }
};

export const deleteTempleController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { locationId } = req.params;
        const temple = await deleteTemple(Number(locationId));
        return res.status(200).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete' });
    }
};

export const updateTempleLikeController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { templeId } = req.params;
        const temple = await updateTempleLike(Number(templeId));
        return res.status(200).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not update like' });
    }
};

export const deleteTempleLikeController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { templeId } = req.params;
        const temple = await deleteTempleLike(Number(templeId));
        return res.status(200).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete like' });
    }
};

export const updateLocationController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { locationId } = req.params;
        const { name, latitude, longitude, provinceId } = req.body;
        const temple = await updateLocation(Number(locationId),{name, latitude, longitude, provinceId});
        return res.status(200).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not update' });
    }
};

export function getAllProvinceCotroler(req: Request, res: Response): void {
    try {
        const provinces = getAllProvince();
        res.json(provinces);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Can not get' });
    }
}
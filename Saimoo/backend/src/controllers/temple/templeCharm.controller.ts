import { Request, Response } from 'express';
import { createTempleCharm,getTempleCharm,updateTempleCharm,deleteTempleCharm,getTempleCharmById} from '../../services/temple.service';
import logger from '../../utils/logger';
import { AuthRequest } from '../../middlewares/authenticateUser.middleware';
import { getTempleIdFromLocationId } from '../../services/location.service';

export const newTempleCharmController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const locationId = req.locationId;

        const templeId = await getTempleIdFromLocationId(Number(locationId));
        const { name, imagePath,price,avalibleDate,status,detail} = req.body;
        const templeCharm = await createTempleCharm({
            name, imagePath, price, avalibleDate, status, detail },Number(templeId) );
        return res.status(201).json(templeCharm);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not create' });
    }
};

export const getTempleCharmController = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("Request params:", req.locationId); // Debugging

        const locationId = req.locationId;
        if (!locationId) {
            return res.status(400).json({ message: 'Location ID is required' });
        }

        const templeId = await getTempleIdFromLocationId(Number(locationId));
        if (!templeId) {
            return res.status(404).json({ message: 'Temple not found' });
        }

        const templeCharm = await getTempleCharm(templeId);
        return res.status(200).json(templeCharm);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Cannot get temple charm' });
    }
};


export const getTempleCharmByIdController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { charmId } = req.params;
        const locationId = req.locationId;
        const templeId = await getTempleIdFromLocationId(Number(locationId));
        const templeCharm = await getTempleCharmById(Number(charmId), Number(templeId));
        return res.status(200).json(templeCharm);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const updateTempleCharmController = async (req: Request, res: Response): Promise<any> => {
    try {
        const charmId = parseInt(req.params.charmId, 10);
        if (isNaN(charmId)) {
            return res.status(400).json({ message: "Invalid charm ID" }); 
        }

        const { name, imagePath, price, avalibleDate, status, detail, templeId } = req.body;

        const parsedTempleId = templeId ? parseInt(templeId, 10) : undefined;

        const templeCharm = await updateTempleCharm(charmId, {
            name,
            imagePath,
            price,
            avalibleDate,
            status,
            detail,
            templeId: parsedTempleId,
        });

        return res.status(200).json(templeCharm); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Cannot update charm" });
    }
};

export const deleteTempleCharmController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { charmId } = req.params;
        const templeCharm = await deleteTempleCharm(Number(charmId));
        return res.status(201).json(templeCharm);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete' });
    }
};
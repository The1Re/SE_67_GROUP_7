import { Request, Response } from 'express';
import { createTempleCharm,getTempleCharm,updateTempleCharm,deleteTempleCharm,getTempleCharmById} from '../services/temple.service';
import logger from '../utils/logger';
import { AuthRequest } from '../middlewares/authenticateUser.middleware';

export const newTempleCharmController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { name, imagePath,price,avalibleDate,status,detail,templeId} = req.body;
        const templeCharm = await createTempleCharm({
            name, imagePath, price, avalibleDate, status, detail, templeId});
        return res.status(201).json(templeCharm);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not create' });
    }
};

export const getTempleCharmController = async (req: Request, res: Response): Promise<any> => {
    try {
        const templeCharm = await getTempleCharm();
        return res.status(201).json(templeCharm);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const getTempleCharmByIdController = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id } = req.params;
        const templeCharm = await getTempleCharmById(Number(id));
        return res.status(201).json(templeCharm);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const updateTempleCharmController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id, name, imagePath,price,avalibleDate,status,detail,templeId} = req.body;
        const templeCharm = await updateTempleCharm(id, { name, imagePath, price, avalibleDate, status, detail, templeId});
        return res.status(201).json(templeCharm);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not update' });
    }
};

export const deleteTempleCharmController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body;
        const templeCharm = await deleteTempleCharm(id);
        return res.status(201).json(templeCharm);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete' });
    }
};
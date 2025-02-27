import { Request, Response } from 'express';
import { createTempleImage, getTempleImages,updateTempleImage,deleteTempleImage,getTempleImagesById} from '../services/temple.service';
import logger from '../utils/logger';
import { AuthRequest } from '../middlewares/authenticateUser.middleware';

export const newTempleImageController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { templeId, imagePath ,description } = req.body;
        const templeImage = await createTempleImage({ templeId, imagePath ,description});
        return res.status(201).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not create' });
    }
};

export const getTempleImageController = async (req: Request , res: Response): Promise<any> => {
    try {
        const templeImage = await getTempleImages();
        return res.status(200).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const getTempleImageByIdController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const templeImage = await getTempleImagesById(Number(id));
        return res.status(200).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const updateTempleImageController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id, imagePath ,description } = req.body;
        const templeImage = await updateTempleImage(id, { imagePath ,description });
        return res.status(201).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not update' });
    }
};

export const deleteTempleImageController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const templeImage = await deleteTempleImage(Number(id));
        return res.status(201).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete' });
    }
};


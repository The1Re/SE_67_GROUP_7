import { Request, Response } from 'express';
import { createTempleImage, getTempleImages,updateTempleImage,deleteTempleImage,getTempleImagesById} from '../../services/temple.service';
import logger from '../../utils/logger';
import { AuthRequest } from '../../middlewares/authenticateUser.middleware';
import { getTempleIdFromLocationId } from '../../services/location.service';

export const newTempleImageController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const locationId = req.locationId;
        const templeId = await getTempleIdFromLocationId(Number(locationId));
        
        const { imagePath ,description } = req.body;
        const templeImage = await createTempleImage({ imagePath ,description},Number(templeId));
        return res.status(201).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not create' });
    }
};

export const getTempleImageController = async (req: Request , res: Response): Promise<any> => {
    try {
        const locationId = req.locationId;
        if (!locationId) {
            return res.status(400).json({ message: 'Location ID is required' });
        }

        const templeId = await getTempleIdFromLocationId(Number(locationId));
        if (!templeId) {
            return res.status(404).json({ message: 'Temple not found' });
        }

        const templeImage = await getTempleImages(templeId);
        return res.status(200).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const getTempleImageByIdController = async (req: Request, res: Response): Promise<any> => {
    try {
        const locationId = req.locationId;
        if (!locationId) {
            return res.status(400).json({ message: 'Location ID is required' });
        }

        const templeId = await getTempleIdFromLocationId(Number(locationId));
        if (!templeId) {
            return res.status(404).json({ message: 'Temple not found' });
        }

        const { imgId } = req.params;
        const templeImage = await getTempleImagesById(Number(imgId), Number(templeId));
        return res.status(200).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const updateTempleImageController = async (req: Request, res: Response): Promise<any> => {
    try {
    
        const { imgId } = req.params;
        console.log("Received imgId:", imgId);
        if (isNaN(Number(imgId))) {
            return res.status(400).json({ message: "Invalid image ID" }); 
        }

        const { imagePath, description } = req.body;

        if (!imagePath && !description) {
            return res.status(400).json({ message: "No data provided for update" });
        }

        const templeImage = await updateTempleImage(Number(imgId), { imagePath, description });

        return res.status(200).json(templeImage); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Cannot update image" });
    }
};

export const deleteTempleImageController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { imgId } = req.params;
        const templeImage = await deleteTempleImage(Number(imgId));
        return res.status(201).json(templeImage);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete' });
    }
};


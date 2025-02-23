import { Request, Response } from 'express';
import { createTemple } from '../services/temple.service';
import logger from '../utils/logger';
import type { User } from '@prisma/client';
import { AuthRequest } from '../middlewares/authenticateUser.middleware';

export const createTempleController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { name, latitude, longitude, provinceId, description } = req.body;
        const temple = await createTemple({ name, latitude, longitude, provinceId, description });
        return res.status(201).json(temple);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
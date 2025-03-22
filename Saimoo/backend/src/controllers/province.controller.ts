import { Request, Response } from "express";
import { AuthRequest } from "../middlewares";
import logger from "../utils/logger";

import { getAllProvince } from "../services/location.service";

export const getAllProvinceController = async (req: Request, res: Response): Promise<any> => {
    try {
        const provinces = await getAllProvince();
        return res.status(200).json({ provinces });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
}

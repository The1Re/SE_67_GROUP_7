import { Response } from "express";
import { AuthRequest } from "../middlewares";
import logger from "../utils/logger";

import { RefundService } from "../services";

export const refundRequest = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { reason, orderId, identityImagePath = null } = req.body;
        if (!reason || !orderId) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        const refund = await RefundService.createRefund(reason, orderId, identityImagePath);
        res.json(refund);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
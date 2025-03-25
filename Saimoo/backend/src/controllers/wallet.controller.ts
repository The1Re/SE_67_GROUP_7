import { Request, Response } from "express";
import logger from "../utils/logger";

import { WalletService } from "../services";
import { AuthRequest } from "../middlewares";

export const getWallet = async (req: AuthRequest, res: Response): Promise<any>  =>{
    try {
        const userId = req.user?.id;
        const wallet = await WalletService.getWallet(userId);
        return res.status(200).json(wallet);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const topup = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { amount } = req.body;
        const userId = req.user?.id;

        if (!amount) {
            return res.status(400).json({ message: 'amount is required' });
        }

        const wallet = await WalletService.topup(userId, amount);
        return res.status(201).json(wallet);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const withdraw = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { amount } = req.body;
        const userId = req.user?.id;

        if (!amount) {
            return res.status(400).json({ message: 'amount is required' });
        }

        const wallet = await WalletService.withdraw(userId, amount);
        return res.status(201).json(wallet);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getWalletTransactions = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const userId = req.user?.id;
        const transactions = await WalletService.getWalletTransactions(userId);
        return res.status(200).json(transactions);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
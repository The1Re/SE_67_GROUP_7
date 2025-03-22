import { Request, Response } from "express";
import logger from "../utils/logger";

import { UserService } from "../services";

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await UserService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const user = await UserService.getUserById(Number(id));
        return res.status(200).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = req.body;

        if (!data.id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await UserService.updateUser(Number(data.id), data);
        return res.status(200).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        await UserService.deleteUser(Number(id));
        return res.status(204).json();
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const userData = req.body;
        const user = await UserService.createUser(userData);
        return res.status(201).json(user);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
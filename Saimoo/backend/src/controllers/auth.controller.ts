import { Request, Response } from 'express';
import { checkIfUserExists, validateUserCredentials, createUser, generateToken } from '@services/user.service';
import logger from '../utils/logger';
import { User } from '@prisma/client';
import { AuthRequest } from '@middlewares/isAuth.middleware';

export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, email, password } = req.body;

        // Check if any field is empty
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        // Check if user already exists
        const userExistsMessage = await checkIfUserExists(username, email);
        if (userExistsMessage) {
            return res.status(400).json(userExistsMessage);
        }

        // Create new user
        const newUser = await createUser({ username, email, password });
        return res.status(201).json({ message: 'User created successfully', username: newUser.username });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body;

        // Check if any field is empty
        if (!username || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        // Validate user credentials
        const userValidationResult = await validateUserCredentials(username, password);
        if ('message' in userValidationResult) {
            return res.status(401).json(userValidationResult);
        }

        const token = generateToken(userValidationResult as User);

        return res.status(200).json({ message: 'Login successful', username: userValidationResult.username, token });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const currentUser = async (req: AuthRequest, res: Response): Promise<any> => {
    return res.status(200).json({ message: req.user })
}
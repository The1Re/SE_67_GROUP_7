import bcrypt from 'bcrypt';
import { User } from "@prisma/client";
import { user } from '../models/user';
import type { UserCredentials } from '../models/user';
import jwt from 'jsonwebtoken';
import { env } from '../config';

export const checkIfUserExists = async (username: string, email: string) => {
    let existingUser = await user.getByEmail(email);
    if (existingUser) {
        return { message: 'Email is already taken' };
    }

    existingUser = await user.getByUsername(username);
    if (existingUser) {
        return { message: 'Username is already taken' };
    }

    return null;
};

export const createUser = async (userData: UserCredentials) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await user.create({ ...userData, password: hashedPassword });
};

export const validateUserCredentials = async (username: string, password: string) => {
    const existingUser = await user.getByUsername(username);
    if (!existingUser) {
        return { message: 'Invalid credentials' };
    }

    const comparePassword = await bcrypt.compare(password, existingUser.password);
    if (!comparePassword) {
        return { message: 'Invalid credentials' };
    }

    return existingUser;
};

export const generateToken = (user: User) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, env.jwtSecret, { expiresIn: '1d' });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, env.jwtSecret);
}
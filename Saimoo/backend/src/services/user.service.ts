import bcrypt from 'bcrypt';
import type { UserCredentials, UserSignUp } from '../models/user'
import { user } from '../models/user';
import { env } from '../config';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

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

export const createUser = async (userData: UserSignUp) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await user.create({ ...userData, password: hashedPassword });
};

export const validateUserCredentials = async ({ username, password }: UserCredentials) => {
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
import prisma from '../models/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config';

import type { User } from "@prisma/client";

import { createWallet } from './wallet.service'

export type UserCredentials = Pick<User, 'username' | 'email' | 'password'>;

export const checkIfUserExists = async (username: string, email: string) => {
    let existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return { message: 'Email is already taken' };
    }

    existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
        return { message: 'Username is already taken' };
    }

    return null;
};

export const createUser = async (userData: UserCredentials) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({ data: { ...userData, password: hashedPassword } });

    await createWallet(user.id);

    return user;
};

export const validateUserCredentials = async (username: string, password: string) => {
    const existingUser = await prisma.user.findUnique({ where: { username } });
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
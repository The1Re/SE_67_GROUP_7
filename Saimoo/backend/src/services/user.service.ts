import prisma from '../models/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config';

import type { Prisma, User, User_role } from "@prisma/client";

import { createWallet } from './wallet.service'
import logger from '../utils/logger';

export const getUserByUsername = async (username: string) => {
    return await prisma.user.findUnique({ where: { username } });
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
}

export const checkIfUserExists = async ({ username, email }: { username?: string, email?: string }) => {
    let existingUser;

    if (username) {
        existingUser = await getUserByUsername(username);
        if (existingUser) {
            return { message: 'Username is already taken' };
        }
    }

    if (email) {
        existingUser = await getUserByEmail(email);
        if (existingUser) {
            return { message: 'Email is already taken' };
        }
    }

    return null;
};

export const updateUser = async (userId: number, userData: Prisma.UserUpdateInput) => {
    return await prisma.user.update({ where: { id: userId }, data: userData });
}

export const createUser = async (userData: Prisma.UserCreateInput, isCreateWallet: boolean = true) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({ data: { ...userData, password: hashedPassword } });

    if (isCreateWallet)
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

export const changeRole = async (userId: number, role: User_role) => {
    return await prisma.user.update({ where: { id: userId }, data: { role } });
}

export const changePassword = async (username: string, oldPassword: string, newPassword: string, checkhash: boolean = true) => {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (!existingUser) {
        logger.error('User not found');
        return null;
    }

    const comparePassword = checkhash ? await bcrypt.compare(oldPassword, existingUser.password) : oldPassword === existingUser.password;
    if (!comparePassword) {
        logger.error('Password does not match');
        return null;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newUser = await prisma.user.update({ where: { username }, data: { password: hashedPassword } });

    return newUser;
}
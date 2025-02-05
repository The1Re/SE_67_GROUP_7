import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { env } from '../config';

export const generateToken = (user: User) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, env.jwtSecret, { expiresIn: '1d' });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, env.jwtSecret);
}
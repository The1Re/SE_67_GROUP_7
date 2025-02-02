import bcrypt from 'bcrypt';
import { user } from '../models/user';
import { UserCredentials } from '../models/user';

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
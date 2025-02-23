import prisma from '../models/prisma';
import bcrypt from 'bcrypt';
import type { Location } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { env } from '../config';

export const createLocation = async (locationData: Omit<Location, "id">) => {
    return await prisma.location.create({ data: locationData });
};

export const getLocationsTemple = async () => {
    return await prisma.location.findMany({where: { type: "temple" }});
};


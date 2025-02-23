import prisma from "../models/prisma";
import type { TempleImage } from "@prisma/client";

export const createTempleImage = async (templeImageData: Omit<TempleImage, "id">) => {
    return await prisma.templeImage.create({ data: templeImageData });
};

export const getTempleImages = async () => {
    return await prisma.templeImage.findMany();
};
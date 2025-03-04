import logger from "../utils/logger";
import prisma from "../models/prisma";
import * as LocationService from "./location.service";
import { Temple,TempleImage,Charm,Activity } from "@prisma/client";

type TempleCreate = {
    name: string;
    latitude?: number | null;
    longitude?: number | null;
    provinceId?: number | null;
    description?: string | null;
}

type TempleUpdate = {
    description?: string | null;
    like?: number | null;
}

export const createTempleForNewtemple = async ({ name, latitude=null, longitude=null, provinceId=null, description=null }: TempleCreate) => {
    const location = await LocationService.createLocation({
        name: name,
        latitude: latitude,
        longitude: longitude,
        provinceId: provinceId, // Fixed the incomplete property
        type: "temple"
    });

    return await prisma.temple.create({
        data: {
            likes: 0,
            description: description, // Ensure description is passed as a parameter
            locationId: location.id
        }
    });
};

export const updateTempleDescription = async (id: number, { description }: TempleUpdate) => {
    await prisma.temple.update({
        where: { id },
        data: {
            description: description
        }
    });
};

export const updateTempleLike = async (id: number) => {
    await prisma.temple.update({
        where: { id },
        data: {
            likes: {
                increment: 1, // เพิ่มค่า likes ขึ้นทีละ 1
            },
        },
    });
};

export const deleteTemple = async (id : number) => {
    logger.info("Deleting temple with id: ", id);
    await prisma.temple.deleteMany({
        where: { locationId : id}
    });
    await LocationService.deleteLocation(id);
};

export const createTempleCharm = async (charmData: Omit<Charm, "charmId">) => {
    return await prisma.charm.create({ data: charmData });
};

export const getTempleCharm = async () => {
    return await prisma.charm.findMany();
};

export const getTempleCharmById = async (charmId: number) => {
    return await prisma.charm.findUnique({
      where: { charmId },
    });
};
  
export const updateTempleCharm = async (charmId: number, charmData: Partial<Charm>) => {
    return await prisma.charm.update({
        where: { charmId },
        data: charmData,
    });
};

export const deleteTempleCharm = async (charmId: number) => {
    return await prisma.charm.delete({
        where: { charmId },
    });
};

export const createTempleImage = async (templeImageData: Omit<TempleImage, "id">) => {
    return await prisma.templeImage.create({ data: templeImageData });
};

export const getTempleImages = async () => {
    return await prisma.templeImage.findMany();
};

export const getTempleImagesById = async (id: number) => {
    return await prisma.templeImage.findUnique({
      where: { id },
    });
};
  
export const updateTempleImage = async (id: number, templeImageData: Partial<TempleImage>) => {
    return await prisma.templeImage.update({
        where: { id },
        data: templeImageData,
    });
};

export const deleteTempleImage = async (id: number) => {
    return await prisma.templeImage.delete({
        where: { id },
    });
};

export const createTempleActivity = async (activityData: Omit<Activity, "id">) => {
    return await prisma.activity.create({ data: activityData });
};

export const getTempleActivities = async () => {
    return await prisma.activity.findMany();
};

export const getTempleActivitiesById = async (id: number) => {
    return await prisma.activity.findUnique({
      where: { id: id },
    });
  };
  
export const updateTempleActivity = async (id: number, activityData: Partial<Activity>) => {
    return await prisma.activity.update({
        where: { id },
        data: activityData,
    });
};

export const deleteTempleActivity = async (id: number) => {
    return await prisma.activity.delete({
        where: { id },
    });
};

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

export const deleteTempleLike = async (id: number) => {
    await prisma.temple.update({
        where: { id },
        data: {
            likes: {
                decrement: 1, // ลดค่า likes ลงทีละ 1
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

export const createTempleCharm = async (charmData: Omit<Charm, "charmId"|"templeId">, templeId: number) => {
    const charmDataWithTempleId = { ...charmData, templeId };
    return await prisma.charm.create({ data: charmDataWithTempleId });
};

export const getTempleCharm = async ( templeId: number) => {
    return await prisma.charm.findMany({
        where: { templeId  : templeId}
    });
};

export const getTempleCharmById = async (charmId: number, templeId: number) => {
    return await prisma.charm.findFirst({
        where: {
            charmId: charmId,  // ID ของ charm
            templeId: templeId, // ID ของวัด
        },
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
        where: { charmId: charmId },
    });
};  ///

export const createTempleImage = async (templeImageData: Omit<TempleImage, "id" | "templeId">, templeId: number) => {
    const templeImageDataWithTempleId = { ...templeImageData, templeId };
    return await prisma.templeImage.create({ data: templeImageDataWithTempleId });
};

export const getTempleImages = async (templeId : number) => {
    return await prisma.templeImage.findMany({
        where: { templeId : templeId}
    });
};

export const getTempleImagesById = async (imgId: number,templeId : number) => {
    return await prisma.templeImage.findUnique({
      where: { id : imgId ,templeId },
    });
};
  
export const updateTempleImage = async (imgId: number, templeImageData: Partial<TempleImage>) => {
    return await prisma.templeImage.update({
        where: { id : imgId },
        data: templeImageData,
    });
};

export const deleteTempleImage = async (imgId: number) => {
    return await prisma.templeImage.delete({
        where: { id : imgId},
    });
};////

export const createTempleActivity = async (activityData: Omit<Activity, "id" | "templeId">, templeId: number) => {
    const activityDataWithTempleId = { ...activityData, templeId };
    return await prisma.activity.create({ data: activityDataWithTempleId });
};

export const getTempleActivities = async (templeId : number) => {
    return await prisma.activity.findMany({
        where: { templeId : templeId}
    });
};

export const getTempleActivitiesById = async (id: number, templeId : number) => {   
    return await prisma.activity.findUnique({
      where: { id: id, templeId : templeId },
    });
  };
  
export const updateTempleActivity = async (id: number, activityData: Partial<Activity>) => {
    return await prisma.activity.update({
        where: { id : id },
        data: activityData,
    });
};

export const deleteTempleActivity = async (id: number) => {
    return await prisma.activity.delete({
        where: { id },
    });
};

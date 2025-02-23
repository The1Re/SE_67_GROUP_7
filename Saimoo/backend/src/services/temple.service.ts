import prisma from "../models/prisma";
import * as LocationService from "./location.service";

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


export const createTemple = async ({ name, latitude=null, longitude=null, provinceId=null, description=null }: TempleCreate) => {
    const location = await LocationService.createLocation({
        name: name,
        latitude: latitude,
        longitude: longitude,
        provinceId: provinceId, // Fixed the incomplete property
        type: "temple"
    });

    await prisma.temple.create({
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

export const updateTempleLike = async (id: number, { like }: TempleUpdate) => {
    await prisma.temple.update({
        where: { id },
        data: {
            likes: like
        }
    });
};


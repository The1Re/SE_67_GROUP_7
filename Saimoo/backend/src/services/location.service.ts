import prisma from '../models/prisma';
import type { Location } from "@prisma/client";


export const createLocation = async (locationData: Omit<Location, "id">) => {
    const checkIfExists = await checkIfTempleExistsInProvince(locationData.name, locationData.provinceId!);
    if (checkIfExists) {
        throw new Error("Temple already exists in this province");
    }
    return await prisma.location.create({ data: locationData });
};

export const getLocationsTemple = async () => {
    return await prisma.location.findMany({where: { type: "temple" }});
};

export const checkIfTempleExistsInProvince = async (name: string, provinceId: number) => {
  const existingLocation = await prisma.location.findFirst({
    where: {
      name: name,
      provinceId: provinceId,
      type: 'temple', // ตรวจสอบที่เป็น temple
    },
  });

  return existingLocation ? true : false;
};

export const getLocationTempleById = async (id: number) => {
  return await prisma.location.findFirst({
    where: {
      id: id,
      type: 'temple',
    },
  });
};

export const getLocationTempleByProvinceId = async (provinceId: number) => {
  return await prisma.location.findMany({
    where: {
      provinceId: provinceId,
      type: 'temple',
    },
  });
};

export const deleteLocation = async (id: number) => {
  return await prisma.location.delete({ where: { id } });
};




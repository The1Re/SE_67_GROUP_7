import prisma from '../models/prisma';
import type { Temple,Location } from "@prisma/client";


export const createLocation = async (locationData: Omit<Location, "id">) => {
    const checkIfExists = await checkIfTempleExistsInProvince(locationData.name, locationData.provinceId!);
    if (checkIfExists) {
        throw new Error("Temple already exists in this province");
    }
    return await prisma.location.create({ data: locationData });
};

export const getLocationsTemple = async (
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = 'id',
  sortOrder: 'asc' | 'desc' = 'desc'
) => {
  const skip = (page - 1) * pageSize;

  const temples = await prisma.location.findMany({
    where: { type: "temple" },
    orderBy: { [sortBy]: sortOrder },
    skip,
    take: pageSize,
    include: { Province: true, Temple: { include: {TempleImage: true}} },
  });

  const totalItems = await prisma.location.count({ where: { type: "temple" } });

  return {
    data: temples,
    pagination: {
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      currentPage: page,
      pageSize,
    },
  };
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
    },include: { Province: true, Temple: true },
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

export const getTempleIdFromLocationId = async (locationId: number) => {
  //console.log("Searching for locationId:", locationId); // Debugging

  const temple = await prisma.location.findFirst({
    where: { id: locationId },
    include: { Temple: true },
  });

  const templeId = temple?.Temple?.[0]?.id;
  return templeId !== undefined ? Number(templeId) : null;
};



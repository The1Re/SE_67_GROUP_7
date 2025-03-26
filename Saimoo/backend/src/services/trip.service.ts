import prisma from "../models/prisma";

import type { Prisma, Trip, TripDetail } from "@prisma/client";

export interface TripData extends Trip {
    TripDetail: TripDetail[];
}

export const getTripAvailable = async (
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'id',
    sortOrder: 'asc' | 'desc' = 'desc',
    where: Prisma.TripWhereInput = { status: 'waiting'}
) => {
    const skip = (page - 1) * pageSize;

    // Fetch trips   
    const trips = await prisma.trip.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: pageSize,
    });

    // Get total count
    const totalItems = await prisma.trip.count({ where: { status: 'waiting' } });

    return {
        data: trips,
        pagination: {
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            currentPage: page,
            pageSize,
        }
    }
}

export const getAllTripByUser = async (userId: number) => {
    return await prisma.trip.findMany({
        where: { ownerTripId: userId }
    });
}

export const getTripById = async (id: number) => {
    return await prisma.trip.findUnique({
        where: { id },
        include: {
            TripDetail: { include: { Location: true, TripDetailPicture: true } },
            TripPicture: true
        }
    });
}

export const createTrip = async (tripData: TripData) => {
    const tripDetail = tripData.TripDetail?.map((detail) => {
        const [hours, minutes] = String(detail.arriveTime).split(":");
        const date = new Date()
        date.setHours(Number(hours), Number(minutes));
        return {
            ...detail,
            arriveTime: date
        }
    });
    return await prisma.trip.create({
        data: {
            ...tripData,
            dateStart: new Date(tripData.dateStart),
            dateEnd: new Date(tripData.dateEnd),
            TripDetail: {
                create: tripDetail
            }
        },
        include: { TripDetail: true }
    });
}

export const updateTrip = async (id: number, tripData: Trip) => {
    return await prisma.trip.update({ 
        where: { id }, 
        data: tripData 
    });
}

export const deleteTrip = async (id: number) => {
    return await prisma.trip.delete({ where: { id } });
}

export const getImages = async (tripId: number) => {
    return await prisma.tripPicture.findMany({
        where: { tripId }
    })
}

export const uploadImage = async (tripId: number, imagePath: string) => {
    return await prisma.tripPicture.create({
        data: {
            tripId,
            imagePath
        }
    })
}

export const updateImage = async (id: number, imagePath: string) => {
    return await prisma.tripPicture.update({
        where: { id },
        data: { imagePath }
    })
}

export const deleteImage = async (id: number) => {
    return await prisma.tripPicture.delete({ where: { id } });
}

export const getTripDetails = async (tripId: number) => {
    return await prisma.tripDetail.findMany({
        where: { tripId },
        include: { Location: true, TripDetailPicture: true }
    })
}

export const newTripDetail = async (tripId: number, tripDetail: TripDetail) => {
    const [hours, minutes] = String(tripDetail.arriveTime).split(":");
    const date = new Date()
    date.setHours(Number(hours), Number(minutes));

    return await prisma.tripDetail.create({
        data: {
            ...tripDetail,
            arriveTime: date,
            tripId
        }
    })
}

export const updateTripDetail = async (id: number, tripDetail: TripDetail) => {
    return await prisma.tripDetail.update({
        where: { id },
        data: tripDetail
    })
}

export const removeTripDetail = async (id: number) => {
    return await prisma.tripDetail.delete({ where: { id } });
}

export const getTripDetailImages = async (tripDetailId: number) => {
    return await prisma.tripDetailPicture.findMany({
        where: { tripDetailId }
    })
}

export const uploadTripDetailImage = async (tripDetailId: number, imagePath: string) => {
    return await prisma.tripDetailPicture.create({
        data: {
            tripDetailId,
            imagePath
        }
    })
}

export const updateTripDetailImage = async (id: number, imagePath: string) => {
    return await prisma.tripDetailPicture.update({
        where: { id },
        data: { imagePath }
    })
}

export const removeTripDetailImage = async (id: number) => {
    return await prisma.tripDetailPicture.delete({ where: { id } });
}
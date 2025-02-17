import prisma from "../models/prisma";

import type{ Trip, TripDetail } from "@prisma/client";

export interface TripData extends Trip {
    TripDetail: TripDetail[];
}

export const getTripAvailable = async () => {
    return await prisma.trip.findMany({ where: { status: 'waiting' }});
}

export const getTripById = async (id: number) => {
    return await prisma.trip.findUnique({ 
        where: { id }, 
        include: {
            TripDetail: true,
            TripPicture: true
        }
    });
}

export const createTrip = async (tripData: TripData) => {
    const tripDetail = tripData.TripDetail?.map((detail) => {
        const [ hours, minutes ] = String(detail.arriveTime).split(":");
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
    return await prisma.trip.update({ where: { id }, data: tripData });
}   

export const deleteTrip = async (id: number) => {
    return await prisma.trip.delete({ where: { id } });
}
import { Prisma } from "@prisma/client";
import prisma from "../models/prisma";

export const createOrder = async (data: Prisma.TripOrderCreateInput) => {
    const order = await prisma.tripOrder.create({
        data
    });
    return order;
}

export const calTotalPrice = async (tripId: number, amountPerson: number) => {
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) {
        throw new Error("Trip not found");
    }

    return trip.price * amountPerson;
}

export const getOrderByTripId = async (tripId: number) => {
    return await prisma.tripOrder.findMany({ where: { tripId }, include: {TripOrderDetail: true, Payment: true} });
}

export const generateIdentityCode = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getAllOrders = async (filters: Prisma.TripOrderWhereInput) => {
    const orders = await prisma.tripOrder.findMany({
        where: filters,
    });

    return orders;
}

export const getOrderById = async (orderId: number) => {
    return await prisma.tripOrder.findUnique({ where: { id: orderId }, include: { TripOrderDetail: true } });
}

export const updateOrder = async (orderId: number, data: Prisma.TripOrderUpdateInput) => {
    return await prisma.tripOrder.update({ where: { id: orderId }, data });
}
import { Prisma, TripOrder } from "@prisma/client";
import prisma from "../models/prisma";
import { WalletService } from "../services";

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
    return await prisma.tripOrder.findMany({ where: { tripId }, include: {TripOrderDetail: true, Payment: true, User: true} });
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

export const refundOrder = async (order: TripOrder, userId: number) => {
    const wallet = await WalletService.getWallet(userId)
    
    try {
        await prisma.$transaction([
            prisma.transaction.create({
                data: {
                    amount: order.totalPrice!,
                    type: "refund",
                    status: "completed",
                    Wallet: {
                        connect: { id: wallet?.id }
                    }
                }
            }),
            prisma.wallet.update({ where: { id: wallet?.id }, data: { balance: wallet?.balance! + order.totalPrice! } }),
            prisma.tripOrder.update({ where: { id: order.id }, data: { status: "claims" } }),
            prisma.payment.updateMany({ where: { orderId: order.id }, data: { status: "refund" } }),
        ]);
        
        return true;
    }catch (error) {
        return false;
    }

}
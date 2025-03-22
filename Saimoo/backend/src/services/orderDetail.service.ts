import prisma from "../models/prisma";

export const getAllOrderDetailsByOrderId = async (orderId: number) => {
    return await prisma.tripOrderDetail.findMany({
        where: {
            orderId
        }
    });
}
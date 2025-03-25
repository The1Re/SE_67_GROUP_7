import { Prisma } from "@prisma/client";
import prisma from "../models/prisma";

export const createRefund = async (orderId: number, reason: string, identityImagePath: string| null = null) => {
    return await prisma.refund.create({
        data: {
            reason,
            identityImagePath,
            status: "pending",
            TripOrder: {
                connect: { id: orderId }
            }
        },
    });
};

export const getRefundBy = async (where: Prisma.RefundWhereInput) => {
    return await prisma.refund.findMany({ where });
};
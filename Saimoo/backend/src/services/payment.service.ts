import prisma from "../models/prisma";

export const createPayment = async (data: any) => {
    return await prisma.payment.create({
        data: {
            ...data,
        },
    });
};

export const getPayments = async (params: any) => {
    return await prisma.payment.findMany({
        where: {
            ...params,
        },
    });
};

export const getPaymentById = async (id: number) => {
    return await prisma.payment.findUnique({
        where: {
            id,
        },
    });
}

export const updatePayment = async (id: number, data: any) => {
    return await prisma.payment.update({
        where: {
            id,
        },
        data: {
            ...data,
        },
    });
}
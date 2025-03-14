import { Payment, Prisma } from "@prisma/client";
import prisma from "../models/prisma";

import * as WalletService from './wallet.service';
import * as OrderService from './order.service';

export const createPayment = async (data: Prisma.PaymentCreateInput) => {
    return await prisma.payment.create({
        data: data
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

export const pay_with_wallet = async (payment: Payment, userId: number, amount: number) => {
    const transaction = await WalletService.pay(userId, amount);
    
    await updatePayment(payment.id, { status: 'successful', transactionId: transaction.id });
    await OrderService.updateOrder(payment.orderId, { status: 'paid' });
}

export const pay_with_qrcode = async (payment: Payment, userId: number, amount: number) => {
    // not implemented
}
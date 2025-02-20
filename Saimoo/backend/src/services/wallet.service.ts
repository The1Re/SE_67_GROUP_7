import { Prisma } from '@prisma/client';
import prisma from '../models/prisma';

export const getWallet = async (userId: number) => {
    return await prisma.wallet.findFirst({ where: { userId } });
}

export const createWallet = async (userId: number) => {
    return await prisma.wallet.create({ 
        data: {
            userId,
            balance: 0
        } 
    });
}

export const topup = async (userId: number, amount: number) => {
    const wallet = await getWallet(userId);

    await prisma.transaction.create({
        data: {
            amount,
            type: 'topup',
            walletId: wallet!.id
        }
    });

    return await prisma.wallet.update({ 
        where: { id: wallet!.id }, 
        data: { balance: { increment: amount } } 
    });
}

export const withdraw = async (userId: number, amount: number) => {
    const wallet = await getWallet(userId);

    await prisma.transaction.create({
        data: {
            amount,
            type: 'withdraw',
            walletId: wallet!.id
        }
    });

    return await prisma.wallet.update({ 
        where: { id: wallet!.id }, 
        data: { balance: { decrement: amount } } 
    });
}

export const getWalletTransactions = async (userId: number) => {
    const wallet = await getWallet(userId);
    return await prisma.transaction.findMany({ 
        where: { walletId: wallet!.id }, 
        orderBy: { createdAt: 'desc' } 
    });
}
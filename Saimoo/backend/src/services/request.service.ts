import prisma from "../models/prisma";
import { Prisma, Request_status } from "@prisma/client";
import generatePassword from "../utils/password";
import { sendMail } from "../utils/mail";

import * as UserService from "./user.service";

export const createRequest = async (data: Prisma.RequestCreateInput) => {
    const request = await prisma.request.create({ data });

    return request;
};

export const getRequests = async () => {
    const requests = await prisma.request.findMany({
        where: {
            status: "Pending"
        },
        include: {
            IdentityDocument: true,
            User: true,
        },
    });

    return requests;
}

export const getRequestById = async (requestId: number) => {
    return await prisma.request.findUnique({  where: { id: requestId } });
}

export const getRequestByIdWithPendingStatus = async (requestId: number) => {
    return await prisma.request.findUnique({ where: { id: requestId, status: "Pending" } });
}

export const approveRequest = (requestId: number) => {
    return prisma.request.update({
        where: {
            id: requestId
        },
        data: {
            status: "Approved"
        }
    });
}

export const rejectRequest = (requestId: number) => {
    return prisma.request.update({
        where: {
            id: requestId
        },
        data: {
            status: "Rejected"
        }
    });
}

export const approveRequestTemple = async (requestId: number) => {
    const request = await getRequestByIdWithPendingStatus(requestId);
    if (!request) {
        return { message: "There is no request id to approved", status: false };
    }
    const temple = await prisma.location.findFirst({
        where: { name: request.templeName ?? "" },
        include: { Temple: true }
    })

    if (!temple) {
        return { message: 'no temple in database', status: false };
    }

    const newPassword = generatePassword(6);
    const existingUser = await UserService.getUserByUsername(request.templeName || '');
    if (existingUser) {
        const newUserTemple = await UserService.changePassword(
            existingUser.username, 
            existingUser.password, 
            newPassword,
            false
        );

        if (newUserTemple) {
            await UserService.updateUser(existingUser.id, {
                email: request.email || '',
                fullName: request.fullName,
                Request: {
                    connect: { id: request.id }
                }
            })

            await prisma.temple.update({
                data: { ownerId: existingUser.id },
                where: { id: temple.Temple[0].id }
            })


            await sendMail(
                request.email || '', 
                'Saimoo Temple Account', 
                `<b>Your username is ${existingUser.username}<br>Password is ${newPassword}</b>`
            );

            await approveRequest(requestId);
            return { message: 'Request approved', status: true };
        } else {
            return { message: 'Failed to update temple account', status: false };
        }
    }

    

    const newUserTemple = await UserService.createUser({
        username: request.templeName || '',
        email: request.email || '',
        fullName: request.fullName,
        password: newPassword,
        role: 'temple',
        Request: {
            connect: { id: request.id }
        }
    }, false);

    await prisma.temple.update({
        data: { ownerId: newUserTemple.id },
        where: { id: temple.Temple[0].id }
    })

    await sendMail(
        newUserTemple.email, 
        'Temple Account', 
        `<b>Your username is ${newUserTemple.username} and password is ${newPassword}<b>`
    );

    await approveRequest(requestId);
    return { message: 'Request approved', status: true };
}

export const approveRequestGuide = async (requestId: number) => {
    const request = await getRequestByIdWithPendingStatus(requestId);
    if (!request) {
        return { message: "There is no request id to approved" };
    }

    await approveRequest(requestId);
    await UserService.changeRole(Number(request?.userId), 'guide');

    return { message: "Request approved" };
}
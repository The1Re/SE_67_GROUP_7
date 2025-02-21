import prisma from "../models/prisma";
import { Prisma, Request_type } from "@prisma/client";

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

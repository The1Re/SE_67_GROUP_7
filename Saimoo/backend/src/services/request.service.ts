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
import prisma from "../models/prisma";
import type { Charm }  from "@prisma/client";

export const createTempleCharm = async (charmData: Omit<Charm, "charmId">) => {
    return await prisma.charm.create({ data: charmData });
};

export const getTempleCharm = async () => {
    return await prisma.charm.findMany();
};
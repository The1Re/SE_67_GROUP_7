import { prisma } from "../config";
import { Temple } from "@prisma/client";

export const temple = {
    async create(data: Temple) {
        return prisma.temple.create({ data });
    },
    async getAll() {
        return prisma.temple.findMany({
            include: {
                Activity: true,
                Charm: true,
                TempleImage: true
            }
        });
    },
    async getById(id: number) {
        return prisma.temple.findFirst({ where: { id } });
    },
    async update(where: any, data: any) {
        return prisma.temple.update({ where, data });
    },
    async delete(where: any) {
        return prisma.temple.delete({ where });
    }
}
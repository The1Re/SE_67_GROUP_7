import { prisma } from "../config";
import { User } from "@prisma/client";

export type UserCredentials = Pick<User, 'username' | 'email' | 'password'>;

export const user = {
    async create(data: UserCredentials) {
        return prisma.user.create({ data });
    },
    async getAll() {
        return prisma.user.findMany();
    },
    async getByUsername(username: string) {
        return prisma.user.findFirst({ where: { username } });
    },
    async getByEmail(email: string) {
        return prisma.user.findFirst({ where: { email } });
    },
    async update(where: any, data: any) {
        return prisma.user.update({ where, data });
    },
    async delete(where: any) {
        return prisma.user.delete({ where });
    },
};

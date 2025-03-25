import prisma from "../models/prisma";
import { ReviewGuide,User } from "@prisma/client";

type GuideCreate = {
    comment: string;
    userId: number;
    guideId: number;
}

type GuideUpdateComment = {
    comment: string;
}

export const createReview = ({comment, userId, guideId}: GuideCreate) => {
    return prisma.reviewGuide.create({
        data: {
            rating : 0,
            comment,
            userId,
            guideId
        }
    })  
}

export const getReview = async (guideId: number) => {
    return await prisma.reviewGuide.findMany({
        where: {
            guideId: guideId
        }
    })
}

export const getReviewById = async (id: number) => {
    return await prisma.reviewGuide.findUnique({
        where: {
            id: id
        }
    })
}

export const updateReview = async (id: number, {comment}: GuideUpdateComment) => {
    return await prisma.reviewGuide.update({
        where: {
            id: id
        },
        data: {
            comment
        }
    })
}

export const deleteReview = async (id: number) => {
    return await prisma.reviewGuide.delete({
        where: {
            id: id
        }
    })
}

export const updateRating = async (id: number, incrementValue: number) => {
    return await prisma.reviewGuide.update({
        where: {
            id: id
        },
        data: {
            rating : {
                increment: incrementValue
            }
        }
    })
}

export const getReviewOrderByRating = async (guideId: number) => {
    return await prisma.reviewGuide.findMany({
        where: {
            guideId: guideId
        },
        orderBy: {
            rating: 'desc'
        }
    })
}

export const getReviewOrderByDate = async (guideId: number) => {
    return await prisma.reviewGuide.findMany({
        where: {
            guideId: guideId
        },
        orderBy: {
            reviewDate: 'desc'
        }
    })
}
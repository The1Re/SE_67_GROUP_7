import prisma from "../models/prisma";

import { Prisma, Trip, TripDetail, Location, Province } from "@prisma/client";

export type TripDetailData = TripDetail & {
    TripDetailPicture: {
        imagePath: string[] | null,
    }
    Location?: Location & {
        Provice: Province
    },
}

export type TripData = Trip & {
    TripPicture: {
        imagePath: string | null,
    }
    TripDetail: TripDetailData[]
}

export const getTrips = async (
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'id',
    sortOrder: 'asc' | 'desc' = 'desc',
    filters: any = {}
) => {
    const skip = (page - 1) * pageSize;

    // กำหนด where filter
    const where: Prisma.TripWhereInput = { ...filters };

    // ถ้ามี filter title ให้ใช้ contains (ค้นหาคล้าย ๆ LIKE ใน SQL)
    if (filters.title) {
        where.title = { contains: filters.title }; // ค้นหาแบบ case-insensitive
    }

    // ดึงข้อมูล trips
    const trips = await prisma.trip.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: pageSize,
        include: {
            TripDetail: { include: { TripDetailPicture: true, Location: true } },
            TripPicture: true,
            User: true
        }
    });

    // นับจำนวน trips ทั้งหมดตาม filter
    const totalItems = await prisma.trip.count({ where });

    return {
        data: trips,
        pagination: {
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            currentPage: page,
            pageSize,
        }
    };
};


export const getAllTripByUser = async (userId: number) => {
    return await prisma.trip.findMany({
        where: { ownerTripId: userId },
        include: {
            TripDetail: { include: { Location: true, TripDetailPicture: true } },
            TripPicture: true,
            User: true
        }
    });
}

export const getTripById = async (id: number) => {
    return await prisma.trip.findUnique({
        where: { id },
        include: {
            TripDetail: { include: { Location: true, TripDetailPicture: true } },
            TripPicture: true,
            User: true
        }
    });
}

// export const createTrip = async (tripData: TripData) => {
//     const tripDetail = tripData.TripDetail?.map((detail) => {
//         const [hours, minutes] = String(detail.arriveTime).split(":");
//         const date = new Date()
//         date.setHours(Number(hours), Number(minutes));
//         return {
//             ...detail,
//             arriveTime: date
//         }
//     });
//     return await prisma.trip.create({
//         data: {
//             ...tripData,
//             dateStart: new Date(tripData.dateStart),
//             dateEnd: new Date(tripData.dateEnd),
//             TripDetail: {
//                 create: tripDetail
//             }
//         },
//         include: { TripDetail: true }
//     });
// }

export const createTrip = async (tripData: TripData) => {
    const { title, description, dateStart, dateEnd, vehicle, maxPerson, status, ownerTripId, type, price, TripPicture, TripDetail } = tripData;
    
    return await prisma.trip.create({
        data: {
            title,
            description,
            dateStart: new Date(dateStart),
            dateEnd: new Date(dateEnd),
            vehicle,
            maxPerson,
            status,
            type,
            price,
            User: {
                connect: { id: ownerTripId }
            },
            TripPicture: {
                create: {
                    imagePath: TripPicture?.imagePath ?? null
                }
            },
            TripDetail: {
                create: TripDetail.map((detail) => ({
                    order: detail.order,
                    day: detail.day,
                    arriveTime: new Date(detail.arriveTime),
                    description: detail.description,
                    Location: detail.Location?.type == 'temple' ? {
                        connect: { id: detail.Location.id }
                    } : { create: {
                        name: detail.Location?.name ?? "unknow place",
                        latitude: Number(detail.Location?.latitude) ?? null,
                        longitude: Number(detail.Location?.longitude) ?? null,
                        type: detail.Location?.type ?? "place",
                    }},
                    TripDetailPicture: {
                        create: detail.TripDetailPicture?.imagePath?.map((d) => ({
                            imagePath: d ?? null
                        }))
                    }
                }))
            }
        }
    });
}

export const updateTrip = async (id: number, tripData: Trip) => {
    return await prisma.trip.update({ 
        where: { id }, 
        data: tripData 
    });
}

export const deleteTrip = async (id: number) => {
    return await prisma.trip.delete({ where: { id } });
}

export const getImages = async (tripId: number) => {
    return await prisma.tripPicture.findMany({
        where: { tripId }
    })
}

export const uploadImage = async (tripId: number, imagePath: string) => {
    return await prisma.tripPicture.create({
        data: {
            tripId,
            imagePath
        }
    })
}

export const updateImage = async (id: number, imagePath: string) => {
    return await prisma.tripPicture.update({
        where: { id },
        data: { imagePath }
    })
}

export const deleteImage = async (id: number) => {
    return await prisma.tripPicture.delete({ where: { id } });
}

export const getTripDetails = async (tripId: number) => {
    return await prisma.tripDetail.findMany({
        where: { tripId },
        include: { Location: true, TripDetailPicture: true }
    })
}

export const newTripDetail = async (tripId: number, tripDetail: TripDetail) => {
    const [hours, minutes] = String(tripDetail.arriveTime).split(":");
    const date = new Date()
    date.setHours(Number(hours), Number(minutes));

    return await prisma.tripDetail.create({
        data: {
            ...tripDetail,
            arriveTime: date,
            tripId
        }
    })
}

export const updateTripDetail = async (id: number, tripDetail: TripDetail) => {
    return await prisma.tripDetail.update({
        where: { id },
        data: tripDetail
    })
}

export const removeTripDetail = async (id: number) => {
    return await prisma.tripDetail.delete({ where: { id } });
}

export const getTripDetailImages = async (tripDetailId: number) => {
    return await prisma.tripDetailPicture.findMany({
        where: { tripDetailId }
    })
}

export const uploadTripDetailImage = async (tripDetailId: number, imagePath: string) => {
    return await prisma.tripDetailPicture.create({
        data: {
            tripDetailId,
            imagePath
        }
    })
}

export const updateTripDetailImage = async (id: number, imagePath: string) => {
    return await prisma.tripDetailPicture.update({
        where: { id },
        data: { imagePath }
    })
}

export const removeTripDetailImage = async (id: number) => {
    return await prisma.tripDetailPicture.delete({ where: { id } });
}

export const cancelTrip = async (id: number) => {
    await prisma.trip.update({
        where: { id },
        data: { status: 'cancel' }
    })

    await prisma.tripOrder.updateMany({
        where: { tripId: id },
        data: { status: 'cancel' }
    })

    const orderList = await prisma.tripOrder.findMany({
        where: { tripId: id },
        include: { User: { include: { Wallet: true } } }
    })

    orderList.forEach(async (v) => {
        const wallet = v.User.Wallet[0];
        await prisma.payment.updateMany({
            where: { orderId: v.id },
            data: { status: 'refund' } 
        })
        await prisma.transaction.create({
            data: {
                amount: v.totalPrice!,
                type: "refund",
                status: "completed",
                Wallet: {
                    connect: { id: wallet.id }
                }
            }
        })
        await prisma.wallet.update({ where: { id: wallet.id }, data: { balance: wallet?.balance! + v.totalPrice! } });
        await prisma.payment.updateMany({ where: { orderId: v.id }, data: { status: "refund" } })
    })
}
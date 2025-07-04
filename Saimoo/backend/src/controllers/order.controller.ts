import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AuthRequest } from "../middlewares";
import logger from "../utils/logger";

import { OrderService, OrderDetailService, TripService } from "../services";
import prisma from "../models/prisma";

export const createOrder = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { tripId, amountPerson, details  } = req.body;
        if (!tripId || !amountPerson || !details) {
            return res.status(400).json({ message: "tripId and amount of person and order details is required" });
        }

        if (amountPerson !== details.length) {
            return res.status(400).json({ message: "Amount of person and order details is not match" });
        }

        details.map((detail: any) => {
            detail.identityCode = OrderService.generateIdentityCode();
        });

        const data: Prisma.TripOrderCreateInput = {
            amountPerson,
            totalPrice: await OrderService.calTotalPrice(tripId, amountPerson),
            status: "pending",
            Trip: {
                connect: { id: tripId }
            },
            User: {
                connect: { id: req.user?.id }
            },
            TripOrderDetail: {
                createMany: { data: details }
            }
        }

        const order = await OrderService.createOrder(data);
        return res.status(201).json(order);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllOrders = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { tripId } = req.query;

        const filters: Prisma.TripOrderWhereInput = {};
        if (tripId) {
            filters.Trip = { id: Number(tripId) };
        } else {
            filters.User = { id: req.user?.id };
        }

        const orders = await OrderService.getAllOrders(filters);
        return res.status(200).json(orders);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getOrderById = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const order = await OrderService.getOrderById(Number(id));
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json(order);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getOrderByTripId = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const orders = await OrderService.getOrderByTripId(Number(id));
        return res.status(200).json(orders);
    }
    catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllOrderDetail = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        console.log(req.params)
        if (!id) {
            return res.status(400).json({ message: "orderId is required" });
        }

        const orderDetails = await OrderDetailService.getAllOrderDetailsByOrderId(Number(id));
        return res.status(200).json(orderDetails);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateOrder = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id, status } = req.body;
        if (!id || !status) {
            return res.status(400).json({ message: "id and status is required" });
        }

        const order = await OrderService.getOrderById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const data: Prisma.TripOrderUpdateInput = {
            status
        }

        await OrderService.updateOrder(id, data);
        return res.status(200).json({ message: "Order updated" });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const refundOrder = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!id) {
            return res.status(400).json({ message: "id is required" });
        }

        const order = await OrderService.getOrderById(Number(id));
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const trip = await prisma.trip.findUnique({ where: { id: order.tripId } });
        if (trip?.status !== "waiting") {
            return res.status(400).json({ message: "Order can't refunds" });
        }

        if (order.status === "claims") {
            return res.status(400).json({ message: "Order already refunded" });
        }else if (order.status === "pending") {
            return res.status(400).json({ message: "Order can't refund" });
        }

        const success = await OrderService.refundOrder(order, Number(userId));
        if (!success) {
            return res.status(400).json({ message: "Refund failed" });
        }
        return res.status(200).json({ message: "Order refunded" });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
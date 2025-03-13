import { Request, Response } from "express";
import { AuthRequest } from "../middlewares";
import logger from "../utils/logger";

import * as OrderService from "../services/order.service";
import * as OrderDetailService from "../services/orderDetail.service";
import { Prisma } from "@prisma/client";

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
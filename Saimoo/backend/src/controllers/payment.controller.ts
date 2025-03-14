import { Response } from "express";
import { AuthRequest } from "../middlewares";

import { PaymentService, OrderService } from "../services";

import logger from "../utils/logger";

export const createPayment = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { orderId, method } = req.body;
        if (!orderId || !method) {
            return res.status(400).json({ error: "orderId and method is required" });
        }

        const order = await OrderService.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ error: "Order is already paid" });
        }

        // const data: Prisma.PaymentCreateInput = {
        //     method,
        //     amount: order.totalPrice,
        //     status: 'pending',
        //     TripOrder: {
        //         connect: { id: orderId }
        //     },
        // }

        const payment = await PaymentService.createPayment(req.body);
        return res.status(201).json(payment);
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ error: "Internal server error" });
    }
};

export const getPayments = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { orderId } = req.query;
        if (!orderId) {
            return res.status(400).json({ error: "orderId is required" });
        }
        const payments = await PaymentService.getPayments({ orderId: Number(orderId) });
        return res.status(200).json(payments);
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ error: "Internal server error" });
    }
}

export const updatePayment = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id, status } = req.body;
        if (!id || !status) {
            return res.status(400).json({ error: "id and status is required" });
        }

        const payment = await PaymentService.getPaymentById(Number(id));
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        if (payment.status === 'successful') {
            return res.status(400).json({ error: "Payment is already paid" });
        }

        await PaymentService.updatePayment(id, { status });
        return res.status(200).json({ message: "Payment updated" });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ error: "Internal server error" });
    }
}

// not finished
export const pay = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id ) {
            return res.status(400).json({ error: "id is required" });
        }

        const payment = await PaymentService.getPaymentById(Number(id));
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        if (payment.status !== 'pending') {
            return res.status(400).json({ error: "Payment is already paid" });
        }

        if (payment.method === 'wallet') {
            try {
                await PaymentService.pay_with_wallet(payment, req.user?.id, payment.amount!);

                return res.status(200).json({ message: "Payment successful" });
            }catch (error) {
                return res.status(400).json({ error });
            }
        } else {
            // qrcode method
        }
        
        return res.status(201).json(payment);
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ error: "Internal server error" });
    }
}
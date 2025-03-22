import { Router } from "express";

import * as OrderController from "../controllers/order.controller";

const routes = Router();

routes.get('/', OrderController.getAllOrders);
routes.get('/:id', OrderController.getOrderById);
routes.post('/', OrderController.createOrder);
routes.patch('/', OrderController.updateOrder);

routes.use('/:id/details', Router({ mergeParams: true })
    .get('/', OrderController.getAllOrderDetail)
)

export default routes;

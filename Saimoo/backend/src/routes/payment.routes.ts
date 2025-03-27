import { Router } from "express";

import * as PaymentController from '../controllers/payment.controller';

const routes = Router();

routes.post('/', PaymentController.createPayment);
routes.get('/', PaymentController.getPayments);
routes.patch('/', PaymentController.updatePayment);
routes.post('/:id/pay', PaymentController.pay)

export default routes;
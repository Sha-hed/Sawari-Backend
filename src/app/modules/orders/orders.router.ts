import express from 'express';
import { OrderControl } from './orders.controller';

const orderRouter = express.Router();

orderRouter.post('/', OrderControl.handleCreateOrder);
orderRouter.get('/revenue', OrderControl.handleCalculateRevenue);

export default orderRouter;

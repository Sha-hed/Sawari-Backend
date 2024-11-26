import { Request, Response } from 'express';
import { OrderService } from './orders.services';
import OrderZodValidationSchema from './orders.validation.zod';

const handleCreateOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const validatedData = OrderZodValidationSchema.parse(order);
    const result = await OrderService.createOrder(validatedData);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something Went Wrong',
      status: false,
      error: error.message,
    });
  }
};
const handleCalculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.calculateTotalRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something Went Wrong',
      status: false,
      error,
    });
  }
};
export const OrderControl = {
  handleCreateOrder,
  handleCalculateRevenue,
};

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express'; // Importing types for Express request and response objects
import { OrderService } from './orders.services';
//import OrderZodValidationSchema from './orders.validation.zod';
import catchAsync from '../../utils/catchAsync';

// Controller to handle order creation
const handleCreateOrder: RequestHandler = async (req, res) => {
  try {
    const order = req.body; // Extracting order data from the request body

    // Validating the order data using Zod schema
    // const validatedData = OrderZodValidationSchema.parse(order);

    // Passing the validated data to the service layer
    const result = await OrderService.createOrder(order, req.ip!);

    // Sending a success response
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    // Handling errors during validation or order creation
    res.status(500).json({
      message: 'Something Went Wrong',
      status: false,
      error: error.message, // Returning the error message
    });
  }
};

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderService.verifyPayment(req.query.order_id as string);
  res.status(200).json({
    message: 'Order Verified successfully',
    status: true,
    data: order,
  });
});
// Controller to calculate total revenue from orders
const handleGetAllOrder: RequestHandler = async (req, res) => {
  try {
    // Fetching total revenue from the service layer
    const result = await OrderService.GetAllOrders();

    // Sending a success response
    res.status(200).json({
      message: 'Order Retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    // Handling errors during revenue calculation
    res.status(500).json({
      message: 'Something Went Wrong',
      status: false,
      error, // Returning the error
    });
  }
};

const handleGetYourOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getYourOrder(req.query);
  res.status(200).json({
    message: 'Order Retrieved successfully',
    status: true,
    data: result,
  });
});

const handleUpdateStatus = catchAsync(async (req: any, res: any) => {
  const result = await OrderService.updateStatusByAdmin(req.body);
  res.status(200).json({
    message: 'Order Updated successfully',
    status: true,
    data: result,
  });
});



// Exporting the Order controller with all handler methods
export const OrderControl = {
  handleCreateOrder,
  handleGetAllOrder,
  verifyPayment,
  handleGetYourOrder,
  handleUpdateStatus
};

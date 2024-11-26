import { Request, Response } from 'express'; // Importing types for Express request and response objects
import { OrderService } from './orders.services'; 
import OrderZodValidationSchema from './orders.validation.zod'; 

// Controller to handle order creation
const handleCreateOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body; // Extracting order data from the request body

    // Validating the order data using Zod schema
    const validatedData = OrderZodValidationSchema.parse(order);

    // Passing the validated data to the service layer
    const result = await OrderService.createOrder(validatedData);

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

// Controller to calculate total revenue from orders
const handleCalculateRevenue = async (req: Request, res: Response) => {
  try {
    // Fetching total revenue from the service layer
    const result = await OrderService.calculateTotalRevenue();

    // Sending a success response 
    res.status(200).json({
      message: 'Revenue calculated successfully',
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

// Exporting the Order controller with all handler methods
export const OrderControl = {
  handleCreateOrder,
  handleCalculateRevenue,
};

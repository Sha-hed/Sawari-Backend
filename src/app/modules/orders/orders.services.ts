import { ProductModel } from '../products/products.model'; // Importing the Product model
import { Order } from './orders.interface'; // Importing the Order interface for 
import { OrderModel } from './orders.model'; // Importing the Order model 

// Service to create a new order
const createOrder = async (order: Order) => {
  const id = order.product; 
  const value = order.quantity; 

  // Finding the product in the database using its ID
  const bike = await ProductModel.findOne({ _id: id });
  if (!bike) {
    // Throwing an error if the product does not exist
    throw new Error("Invalid product id");
  }

  const availableBike = bike?.quantity as number; // Retrieving the available stock of the product

  // Checking if the requested quantity exceeds available stock
  if (value > availableBike) {
    throw new Error('Insufficient stock of the product'); // Throwing an error for insufficient stock
  } else if (value === availableBike) {
    // If the requested quantity matches the available stock, mark the product as out of stock
    await ProductModel.findOneAndUpdate(
      { _id: id },
      { $set: { quantity: 0, inStock: false } }, // Setting the stock to 0 and marking it as out of stock
    );

    // Creating the order in the database
    const result = await OrderModel.create(order);
    return result; 
  } else {
    // If sufficient stock is available, decrement the stock by the ordered quantity
    await ProductModel.findOneAndUpdate(
      { _id: id },
      { $inc: { quantity: -value } }, // Decreasing the stock by the ordered quantity
    );

    // Creating the order in the database
    const result = await OrderModel.create(order);
    return result; // Returning the created order
  }
};

// Service to calculate the total revenue from all orders
const calculateTotalRevenue = async () => {
  // Using MongoDB aggregation to calculate total revenue
  const result = await OrderModel.aggregate([
    {
      $addFields: {
        product: { $toObjectId: '$product' }, 
      },
    },
    {
      $lookup: {
        from: 'products', 
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $project: {
        totalPrice: { $multiply: ['$quantity', '$productDetails.price'] }, 
      },
    },
    {
      $group: {
        _id: null, // Grouping all orders to calculate the total revenue
        totalRevenue: { $sum: '$totalPrice' }, 
      },
    },
    {
      $project: { _id: 0, totalRevenue: 1 }, 
    },
  ]);
  return result; 
};

// Exporting the OrderService with the available methods
export const OrderService = {
  createOrder,
  calculateTotalRevenue,
};

import { model, Schema } from 'mongoose';
import { Order } from './orders.interface'; 

// Defining the schema for the 'Order' collection in MongoDB
const orderSchema = new Schema<Order>(
  {
    
    email: {
      type: String, 
      required: [true, 'Email is required for the order.'], 
    },
    product: {
      type: String, 
      required: [true, 'Product is required for the order.'], 
    },

    quantity: {
      type: Number, 
      required: [true, 'Quantity is required for the order.'], 
      min: [1, 'Quantity must be at least 1.'],
    },
    totalPrice: {
      type: Number, 
      required: [true, 'Total price is required for the order.'], 
      min: [0, 'Total price must be a positive number.'], 
    },
  },
  {
    // Automatically add `createdAt` and `updatedAt` timestamps to the schema
    timestamps: true,
  },
);

// Creating a Mongoose model named 'OrderModel'
export const OrderModel = model<Order>('Order', orderSchema);

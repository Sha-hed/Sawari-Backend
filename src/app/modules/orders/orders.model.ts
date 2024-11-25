import { model, Schema } from "mongoose";
import { Order } from "./orders.interface";

const orderSchema = new Schema<Order>(
  {
    email: { 
      type: String, 
      required: [true, "Email is required for the order."]
    },
    product: { 
      type: String, 
      required: [true, "Product is required for the order."]
    },
    quantity: { 
      type: Number, 
      required: [true, "Quantity is required for the order."],
      min: [1, "Quantity must be at least 1."]
    },
    totalPrice: { 
      type: Number, 
      required: [true, "Total price is required for the order."],
      min: [0, "Total price must be a positive number."]
    },
  },
  { timestamps: true }
);

export const OrderModel = model<Order>('Order', orderSchema);

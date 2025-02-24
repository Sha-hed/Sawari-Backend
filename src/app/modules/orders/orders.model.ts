import { model, Schema } from 'mongoose';
import { TOrder } from './orders.interface';

const orderSchema = new Schema<TOrder>(
  { 
    name: {
      type: String, 
      required: [true, 'Name is required for the order.'], 
    },
    email: {
      type: String, 
      required: [true, 'Email is required for the order.'], 
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product is required for the order.'], 
      ref: 'Bike'
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
    transaction: {
      order_id: {
        type: String, 
        default: 'none' // ✅ Sets the default value to 'none'
      },
      bank_status: {
        type: String, 
        enum: ['none', 'Pending', 'Cancel', 'Paid'], // ✅ Added 'none' as an allowed value
        default: 'none' // ✅ Sets the initial status as 'none'
      }
    }
  },
  {
    timestamps: true,
  }
);

// Creating a Mongoose model named 'OrderModel'
export const OrderModel = model<TOrder>('Order', orderSchema);

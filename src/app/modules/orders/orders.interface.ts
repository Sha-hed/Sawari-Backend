import { Types } from 'mongoose';

export type TOrder = {
  name: string;
  email: string;
  product: Types.ObjectId; // or string if needed
  quantity: number;
  totalPrice: number;
  transaction: {
    order_id: string;
    bank_status: 'Pending' | 'Cancel' | 'Paid' | 'none';
  };
};

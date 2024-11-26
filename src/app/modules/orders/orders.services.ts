import { ProductModel } from '../products/products.model';
import { Order } from './orders.interface';
import { OrderModel } from './orders.model';

const createOrder = async (order: Order) => {
  const id = order.product;
  const value = order.quantity;
  const bike = await ProductModel.findOne({ _id: id });
  if(!bike){
    throw new Error("Invalid product id")
  }
  const availableBike = bike?.quantity as number;

  if (value > availableBike) {
    throw new Error('Insufficient stock of the product');
  } else if (value === availableBike) {
    await ProductModel.findOneAndUpdate(
      { _id: id },
      { $set: { quantity: 0, inStock: false } },
    );
    const result = await OrderModel.create(order);
    return result;
  } else {
    await ProductModel.findOneAndUpdate(
      { _id: id },
      { $inc: { quantity: -value } },
    );
    const result = await OrderModel.create(order);
    return result;
  }
};
const calculateTotalRevenue = async () => {
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
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: { _id: 0, totalRevenue: 1 },
    },
  ]);
  console.log(result);
  return result;
};
export const OrderService = {
  createOrder,
  calculateTotalRevenue,
};

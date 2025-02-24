/* eslint-disable @typescript-eslint/no-explicit-any */
import { BikeModel } from '../bikes/bike.model';
import { orderUtils } from './order.utils';
import { TOrder } from './orders.interface';
import { OrderModel } from './orders.model';
// Service to create a new order
const createOrder = async (payload: TOrder, client_ip: string) => {
  const id = payload.product;
  const value = payload.quantity;

  // Finding the product in the database using its ID
  const bike = await BikeModel.findOne({ _id: id });

  if (!bike) {
    // Throwing an error if the product does not exist
    throw new Error('Invalid product id');
  }

  //Updating Bike Quantity

  await BikeModel.findByIdAndUpdate(id, { $inc: { quantity: -value } });

  // const availableBike = bike?.quantity as number; // Retrieving the available stock of the product

  // //Checking if the requested quantity exceeds available stock

  // If the requested quantity matches the available stock, mark the product as out of stock
  //   await ProductModel.findOneAndUpdate(
  //     { _id: id },
  //     { $set: { quantity: 0, inStock: false } }, // Setting the stock to 0 and marking it as out of stock
  //   );

  // Creating the order in the database
  //   return result;
  // } else {
  //   // If sufficient stock is available, decrement the stock by the ordered quantity
  //   await ProductModel.findOneAndUpdate(
  //     { _id: id },
  //     { $inc: { quantity: -value } }, // Decreasing the stock by the ordered quantity
  //   );

  // Creating the order in the database
  //   const result = await OrderModel.create(payload);
  //   return result; // Returning the created order
  // }

  // const result = await OrderModel.create(payload);
  // return result;
  const result = await OrderModel.create(payload);
  // return result

  // Payment Integration
  const shurjopayPayload = {
    amount: payload.totalPrice,
    order_id: result._id,
    currency: 'BDT',
    customer_name: payload.name,
    customer_address: 'Bangladesh',
    customer_email: payload.email,
    customer_phone: '01780306163',
    customer_city: 'New York',
    client_ip,
  };

  // const shurjopayPayload = {
  //   amount: totalPrice,
  //   order_id: order._id,
  //   currency: "BDT",
  //   customer_name: user.name,
  //   customer_address: user.address,
  //   customer_email: user.email,
  //   customer_phone: user.phone,
  //   customer_city: user.city,
  //   client_ip,
  // };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  const orderUpdate = await OrderModel.findByIdAndUpdate(
    result._id, // Pass only the ID, not an object
    {
      transaction: {
        order_id: payment.sp_order_id,
        bank_status: 'Pending',
      },
    },
    { new: true }, // Ensure the updated document is returned
  );

  // if (payment?.transactionStatus) {
  //   order = await order.updateOne({
  //     transaction: {
  //       id: payment.sp_order_id,
  //       transactionStatus: payment.transactionStatus,
  //     },
  //   });
  // }

  return { payment, orderUpdate };
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
  return verifiedPayment;
};

const GetAllOrders = async () => {
  // Using MongoDB aggregation to calculate total revenue
  const result = await OrderModel.find().populate('product');
  return result;
};

const getYourOrder = async (query: any) => {
  const filter = { email: query.email }
  const orders = await OrderModel.find(filter);

  if (!orders.length) {
    console.log('No orders found');
    return;
  }

  const order_ids = orders.map((order) => order.transaction?.order_id);
  const verifiedPayment = await orderUtils.verifyPaymentAsync(
    order_ids[order_ids.length - 1],
  );
  const status =
    verifiedPayment[0]?.bank_status === 'Success'
      ? 'Success'
      : verifiedPayment[0]?.bank_status === 'Failed'
        ? 'Failed'
        : 'Pending';

  await OrderModel.findByIdAndUpdate(
    orders[order_ids.length - 1]._id,
    { $set: { 'transaction.bank_status': status } },
    { new: true },
  );
  const updatedData = await OrderModel.find(filter);
  return updatedData;
};

const updateStatusByAdmin = async (payload: { id: string; status: string }) => {
  try {
    const { id, status } = payload;

    const result = await OrderModel.findByIdAndUpdate(
      id,
      { $set: { 'transaction.bank_status': status } },
      { new: true }, // Ensures the updated document is returned
    );

    if (!result) {
      throw new Error('Order not found');
    }

    return result;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};


// Exporting the OrderService with the available methods
export const OrderService = {
  createOrder,
  GetAllOrders,
  verifyPayment,
  getYourOrder,
  updateStatusByAdmin
};

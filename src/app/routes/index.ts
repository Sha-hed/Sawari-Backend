import express from 'express';
import { productRouter } from '../modules/products/products.router';
import { orderRouter } from '../modules/orders/orders.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/products',
    route: productRouter,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

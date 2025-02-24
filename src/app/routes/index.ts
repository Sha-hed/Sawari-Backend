import express from 'express';
import { orderRouter } from '../modules/orders/orders.router';
import { userRouter } from '../modules/users/user.route';
import { bikeRouter } from '../modules/bikes/bike.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/bikes',
    route: bikeRouter,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
  {
    path: '/auth',
    route: userRouter,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

import express from 'express'; // Importing Express
import { OrderControl } from './orders.controller';

const router = express.Router(); // Creating a new router instance for order-related routes

//Route to handle the creation of a new order



router.post('/', OrderControl.handleCreateOrder);
router.get('/', OrderControl.verifyPayment);
router.get('/getAllOrder', OrderControl.handleGetAllOrder)
router.get('/getYourOrder', OrderControl.handleGetYourOrder)
router.post('/updateStatus', OrderControl.handleUpdateStatus)

// Route to handle the calculation of total revenue
// router.get('/revenue', OrderControl.handleCalculateRevenue);

// Exporting the router
export const orderRouter = router;

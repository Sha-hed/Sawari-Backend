import express from 'express'; // Importing Express 
import { OrderControl } from './orders.controller'; 

const orderRouter = express.Router(); // Creating a new router instance for order-related routes

//Route to handle the creation of a new order
orderRouter.post('/', OrderControl.handleCreateOrder);

// Route to handle the calculation of total revenue
orderRouter.get('/revenue', OrderControl.handleCalculateRevenue);

// Exporting the router 
export default orderRouter;

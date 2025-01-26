import express from 'express'; // Importing Express 
import { OrderControl } from './orders.controller'; 

const router = express.Router(); // Creating a new router instance for order-related routes

//Route to handle the creation of a new order
router.post('/', OrderControl.handleCreateOrder);

// Route to handle the calculation of total revenue
router.get('/revenue', OrderControl.handleCalculateRevenue);

// Exporting the router  
export const orderRouter = router;

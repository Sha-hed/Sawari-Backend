import express from 'express'; 
import { ProductController } from './products.controller'; 

// Initialize the router for product-related routes
const productRouter = express.Router();

//Handles adding a new product to the database
productRouter.post('/', ProductController.handleCreateBike);

//Route to retrieve all bike products
productRouter.get('/', ProductController.handleGetAllBikes);

// Route to retrieve a single bike product by its ID
productRouter.get('/:productId', ProductController.handleGetSingleBike);

// Route to update a specific bike product by its ID
productRouter.put('/:productId', ProductController.handleUpdateBike);

// Route to delete a specific bike product by its ID
productRouter.delete('/:productId', ProductController.handleDeleteBike);

// Export the router to be used in the main application
export default productRouter;

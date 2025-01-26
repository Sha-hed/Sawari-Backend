import express from 'express'; 
import { ProductController } from './products.controller'; 

// Initialize the router for product-related routes
const router = express.Router();

//Handles adding a new product to the database
router.post('/', ProductController.handleCreateBike);

//Route to retrieve all bike products
router.get('/', ProductController.handleGetAllBikes);

// Route to retrieve a single bike product by its ID
router.get('/:productId', ProductController.handleGetSingleBike);

// Route to update a specific bike product by its ID
router.put('/:productId', ProductController.handleUpdateBike);

// Route to delete a specific bike product by its ID
router.delete('/:productId', ProductController.handleDeleteBike);

// Export the router to be used in the main application
export const productRouter = router;

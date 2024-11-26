import { Request, Response } from 'express'; 
import { ProductServices } from './products.services';
import ZodValidationSchema from './products.validation.zod'; 

// Controller to handle the creation of a new bike
const handleCreateBike = async (req: Request, res: Response) => {
  try {
    const bike = req.body; 
    const ValidatedData = ZodValidationSchema.parse(bike); // Validating the bike data using Zod schema
    const result = await ProductServices.createBike(ValidatedData); // Calling the service to create the bike
    res.status(200).json({
      message: 'Bike created successfully', // Success message
      status: true,
      data: result, // Returning the created bike data
    });
  } catch (error: any) {
    // Sending error response in case of failure
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error, // Error message
      stack: error.stack, // Error stack for debugging
    });
  }
};

// Controller to handle retrieving all bikes with optional query filters
const handleGetAllBikes = async (req: Request, res: Response) => {
  try {
    const query = req.query; // Extracting query parameters from the request
    const result = await ProductServices.getAllBikes(query); // Fetching all bikes based on query filters
    res.status(200).json({
      message: 'Bikes retrieved successfully', 
      success: true,
      data: result, 
    });
  } catch (error: any) {
    // Sending error response in case of failure
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error, // Error message
      stack: error.stack, // Error stack for debugging
    });
  }
};

// Controller to handle retrieving a single bike by its ID
const handleGetSingleBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId; // Extracting bike ID from the request parameters
    const result = await ProductServices.getBikeById(id); // Fetching the bike by ID
    res.status(200).json({
      message: 'Bike retrieved successfully', // Success message
      success: true,
      data: result, 
    });
  } catch (error: any) {
    // Sending error response in case of failure
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error, // Error message
      stack: error.stack, // Error stack for debugging
    });
  }
};

// Controller to handle updating a bike's details by its ID
const handleUpdateBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId; // Extracting bike ID 
    const updatedInfo = req.body; // Extracting the updated bike data 
    const result = await ProductServices.updateBikeById(id, updatedInfo); // Updating the bike in the database
    res.status(200).json({
      message: 'Bike updated successfully', 
      success: true,
      data: result, 
    });
  } catch (error: any) {
    // Sending error response in case of failure
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error, // Error message
      stack: error.stack, // Error stack for debugging
    });
  }
};

// Controller to handle deleting a bike by its ID
const handleDeleteBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId; // Extracting bike ID 
    await ProductServices.deleteBike(id); // Deleting the bike from the database
    res.status(200).json({
      message: 'Bike deleted successfully', 
      status: true,
      data: {}, // Returning an empty object as a response
    });
  } catch (error: any) {
    // Sending error response in case of failure
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error, 
      stack: error.stack, // Error stack for debugging
    });
  }
};

// Exporting all the product-related controllers as a single object
export const ProductController = {
  handleCreateBike,
  handleGetAllBikes,
  handleGetSingleBike,
  handleUpdateBike,
  handleDeleteBike,
};

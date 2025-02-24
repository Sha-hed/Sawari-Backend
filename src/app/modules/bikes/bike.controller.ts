/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BikeServices } from './bike.service';

const handleCreateBike: RequestHandler = catchAsync(async (req, res) => {
  const bike = req.body;
  const result = await BikeServices.createBike(bike);
  res.status(200).json({
    message: 'Bike Added Successfully',
    status: true,
    data: result,
  });
});

// Controller to handle retrieving all bikes with optional query filters
const handleGetAllBikes: RequestHandler = async (req, res) => {
  try {
    // Extracting query parameters from the request
    console.log('Ki Obosta bro', req.query);
    // console.log('Params', req.params);
    const result = await BikeServices.getAllBikes(req.query); // Fetching all bikes based on query filters
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

const handleFeaturedBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getFeaturedBikes();
  res.status(200).json({
    message: 'Bikes retrieved successfully',
    success: true,
    data: result,
  });
});

// Controller to handle retrieving a single bike by its ID
const handleGetSingleBike: RequestHandler = async (req, res) => {
  try {
    const id = req.params.productId; // Extracting bike ID from the request parameters
    console.log('Bike id pas', id);
    const result = await BikeServices.getBikeById(id); // Fetching the bike by ID
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
const handleUpdateBike: RequestHandler = async (req, res) => {
  try {
    // const id = req.params.productId; // Extracting bike ID
    const updatedInfo = req.body; // Extracting the updated bike data
    const { id, ...bikeInfo} = updatedInfo
    const result = await BikeServices.updateBikeById(id, bikeInfo); // Updating the bike in the database
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
const handleDeleteBike: RequestHandler = async (req, res) => {
  try {
    const id = req.params.bikeId; // Extracting bike ID
    const result =  await BikeServices.deleteBike(id); // Deleting the bike from the database
    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: result, // Returning an empty object as a response
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
export const BikeController = {
  handleCreateBike,
  handleGetAllBikes,
  handleGetSingleBike,
  handleUpdateBike,
  handleDeleteBike,
  handleFeaturedBike
};

import { Request, Response } from 'express';
import { ProductServices } from './products.services';
import ZodValidationSchema from './products.validation.zod';

const handleCreateBike = async (req: Request, res: Response) => {
  try {
    const bike = req.body;
    const ValidatedData = ZodValidationSchema.parse(bike);
    const result = await ProductServices.createBike(ValidatedData);
    res.status(200).json({
      message: 'Bike created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error,
      stack: error.stack,
    });
  }
};
const handleGetAllBikes = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    console.log(query);
    const result = await ProductServices.getAllBikes(query);
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error,
      stack: error.stack,
    });
  }
};
const handleGetSingleBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductServices.getBikeById(id);
    res.status(200).json({
      message: 'Bike retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error,
      stack: error.stack,
    });
  }
};
const handleUpdateBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const updatedInfo = req.body;
    const result = await ProductServices.updateBikeById(id, updatedInfo);
    res.status(200).json({
      message: 'Bike updated successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error,
      stack: error.stack,
    });
  }
};
const handleDeleteBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    await ProductServices.deleteBike(id);
    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

export const ProductController = {
  handleCreateBike,
  handleGetAllBikes,
  handleGetSingleBike,
  handleUpdateBike,
  handleDeleteBike,
};

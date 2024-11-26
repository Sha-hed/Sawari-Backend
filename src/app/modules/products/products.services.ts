import { Products } from './products.interface'; 
import { ProductModel } from './products.model';

// Function to create a new bike product in the database
const createBike = async (product: Products) => {
  const result = await ProductModel.create(product);
  return result; 
};

// Function to get all bike products from the database
const getAllBikes = async (query: object) => {
 
  const result = await ProductModel.find(query);
  return result; 
};

// Function to get a single bike product by its ID
const getBikeById = async (id: string) => {
  
  const result = await ProductModel.findOne({ _id: id });
  return result; 
};

// Function to update a specific bike product by its ID
const updateBikeById = async (id: string, updatedInfo: object) => {

  const result = await ProductModel.findOneAndUpdate(
    { _id: id },
    updatedInfo,
    {
      new: true,
      timestamps: true, 
    }
  );
  return result; 
};

// Function to delete a specific bike product by its ID
const deleteBike = async (id: string) => {
 
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

// Exporting all the product service functions for use in controllers
export const ProductServices = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBikeById,
  deleteBike,
};

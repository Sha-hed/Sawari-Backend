/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';
import { BikeModel } from './bike.model';

const createBike = async (payload: TBike) => {
  const result = await BikeModel.create(payload);
  return result;
};

// Function to get all bike products from the database
const getAllBikes = async (query: Record<string, any>) => {
  try {
    const { search, category, brand, minimum, maximum, firstPage = 0 } = query;

    const limit = 3;
    const skip = Number(firstPage) * limit;

    let filter: Record<string, any> = {};

    if (search) {
      // If search text is provided, find by name or description using regex
      filter = {
        $or: [
          { name: { $regex: search, $options: 'i' } }, // Case-insensitive search in name
          { model: { $regex: search, $options: 'i' } }, // Case-insensitive search in description
          { brand: { $regex: search, $options: 'i' } }, // Case-insensitive search in name
          { category: { $regex: search, $options: 'i' } }, // Case-insensitive search in description
        ],
      };
    } else {
      // If no search text, apply filtering conditions
      if (category) filter.category = category;
      if (brand) filter.brand = brand;

      if (minimum && maximum)
        filter.price = { $gte: Number(minimum), $lte: Number(maximum) };
      else if (minimum) filter.price = { $gte: Number(minimum) };
      else if (maximum) filter.price = { $lte: Number(maximum) };
    }

    // Get total count of filtered data
    const totalFilteredBikes = await BikeModel.countDocuments(filter);

    // Fetch paginated data
    const bikes = await BikeModel.find(filter).skip(skip).limit(limit);

    return { totalFilteredBikes, bikes };
    
  } catch (error) {
    throw new AppError(404, 'Something Is Wrong');
  }
};

const getFeaturedBikes = async()=>{
  const result = await BikeModel.find();
  return result;
}

// Function to get a single bike product by its ID
const getBikeById = async (id: string) => {
  const result = await BikeModel.findOne({ _id: id });
  return result;
};

// Function to update a specific bike product by its ID
const updateBikeById = async (id: string, updatedInfo: object) => {
  const result = await BikeModel.findOneAndUpdate({ _id: id }, updatedInfo, {
    new: true,
    timestamps: true,
  });
  return result;
};

// Function to delete a specific bike product by its ID
const deleteBike = async (id: string) => {
  const result = await BikeModel.findByIdAndDelete(id);
  return result;
};

// Exporting all the product service functions for use in controllers
export const BikeServices = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBikeById,
  deleteBike,
  getFeaturedBikes 
};

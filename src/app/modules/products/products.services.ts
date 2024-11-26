import { Products } from './products.interface';
import { ProductModel } from './products.model';

const createBike = async (product: Products) => {
  const result = await ProductModel.create(product);
  return result;
};
const getAllBikes = async (query: object) => {
  const result = await ProductModel.find(query);
  return result;
};
const getBikeById = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  console.log('Single Bikre Result ', result);
  return result;
};
const updateBikeById = async (id: string, updatedInfo: object) => {
  const result = await ProductModel.findOneAndUpdate({ _id: id }, updatedInfo, {
    new: true,
    timestamps: true,
  });
  return result;
};
const deleteBike = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

export const ProductServices = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBikeById,
  deleteBike,
};

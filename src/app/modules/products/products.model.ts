import { Aggregate, model, Schema } from "mongoose";
import { Products } from "./products.interface";
import { NextFunction } from "express";

export const productSchema = new Schema<Products>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Mountain", "Road", "Hybrid", "Electric"],
    required: true,
  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
},{timestamps: true});

// 

export const ProductModel = model<Products>('Product', productSchema);

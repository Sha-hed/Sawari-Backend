import { model, Schema } from 'mongoose'; 
import { Products } from './products.interface'; 

// Define the Mongoose schema for products
export const productSchema = new Schema<Products>(
  {
    name: { type: String, required: true }, 
    brand: { type: String, required: true },
    price: { type: Number, required: true }, 
    category: {
      type: String, 
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
      required: true, 
    },
    description: { type: String, required: true }, 
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true }, // Automatically manage `createdAt` and `updatedAt` fields
);

// Create the Mongoose model 
export const ProductModel = model<Products>('Product', productSchema);

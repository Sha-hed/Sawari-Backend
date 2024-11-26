import { z } from 'zod';
// Zod schema to validate the product data 
const ZodValidationSchema = z.object({
  name: z.string().min(1,"Name is required."),
  brand: z.string().min(1, "Brand is required."),
  price: z.number().positive({message: "Price must be a positive number."}),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric']),
  description: z.string().min(1,"Description is required"),
  quantity: z.number().positive({message: "Quantity must be a positive number"}),
  inStock: z.boolean(),
});
// Export the validation schema 
export default ZodValidationSchema;

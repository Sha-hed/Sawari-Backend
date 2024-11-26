import { z } from 'zod';

const OrderZodValidationSchema = z.object({
  email: z.string().email({
    message:
      'The email address provided is not valid. Please provide a valid email.',
  }),
  product: z.string().min(1, "Product id is required"),
  quantity: z.number().positive({ message: 'Quantity must be at least 1.' }),
  totalPrice: z
    .number({ invalid_type_error: 'Total price must be a number.' })
    .positive({ message: 'Total price must be a non-negative value.' }),
});

export default OrderZodValidationSchema;

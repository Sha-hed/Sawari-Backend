import { z } from 'zod';

// Zod schema to validate the product data

const ZodRegisterValidationSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().min(1, 'Email is required.'),
  password: z.string({ message: 'password is required.' }),
  role: z.enum(['customer', 'admin']).default('customer'),
});

const ZodLoginValidationSchema = z.object({
  email: z.string().min(1, 'Email is required.'),
  password: z.string({ message: 'password is required.' }),
});

// Export the validation schema
export const zodUserValidationSchema = {
  ZodRegisterValidationSchema,
  ZodLoginValidationSchema,
};

// Define the structure for a Product type in TypeScript
export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  isBlocked: boolean
};

// Define the structure for a Product type in TypeScript
export type Products = {
  name: string; 
  brand: string; 
  price: number; 
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric'; 
  description: string; 
  quantity: number; 
  inStock: boolean; 
};

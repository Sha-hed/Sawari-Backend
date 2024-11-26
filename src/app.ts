import express from 'express';
import cors from 'cors';
import orderRouter from './app/modules/orders/orders.router';
import productRouter from './app/modules/products/products.router';
const app = express();

// Middleware setup for parsing incoming JSON data and enabling CORS
app.use(express.json());
app.use(cors()); 

// Setting up routers for product and order routes
app.use('/api/products', productRouter); // Route for product-related operations
app.use('/api/orders', orderRouter); // Route for order-related operations

// Default route for the root path
app.get('/', (req, res) => {
  res.send('Bike Store Server!'); 
});

export default app; // Export the app instance for use in server setup

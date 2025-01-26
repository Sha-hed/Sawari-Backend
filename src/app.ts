import express from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
const app = express();

// Middleware setup for parsing incoming JSON data and enabling CORS
app.use(express.json());
app.use(cors()); 

// Setting up routers for product and order routes
app.use('/api',router)
// Default route for the root path
app.get('/', (req, res) => {
  res.send('Bike Store Server!'); 
});


app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app; // Export the app instance for use in server setup

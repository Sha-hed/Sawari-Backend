import express from 'express';
import cors from 'cors';
import orderRouter from './app/modules/orders/orders.router';
import productRouter from './app/modules/products/products.router';
const app = express();

// Parser
app.use(express.json());
app.use(cors());
//Router
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
  res.send('Bike Store Server!');
});

export default app;

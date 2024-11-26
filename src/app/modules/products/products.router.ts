import express from 'express';
import { ProductController } from './products.controller';

const productRouter = express.Router();

productRouter.post('/add-product', ProductController.handleCreateBike);
productRouter.get('/', ProductController.handleGetAllBikes);
productRouter.get('/:productId', ProductController.handleGetSingleBike);
productRouter.put('/:productId', ProductController.handleUpdateBike);
productRouter.delete('/:productId', ProductController.handleDeleteBike);

export default productRouter;

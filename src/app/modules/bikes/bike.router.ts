import express from 'express';

import { BikeController } from './bike.controller';

const router = express.Router();

router.post('/addBike', BikeController.handleCreateBike);

router.get('/', BikeController.handleGetAllBikes);

router.get('/featured', BikeController.handleFeaturedBike)

router.get('/:productId', BikeController.handleGetSingleBike);

router.post('/update', BikeController.handleUpdateBike);
// router.patch('/:bikeId', BikeController.handleUpdateBike);

router.delete('/:bikeId', BikeController.handleDeleteBike);

export const bikeRouter = router;

import express from 'express';

import {
    getAllRestaurants,
    createRestaurant,
    getRestaurantById,
    uploadRestaurantImage,
    updateRestaurant,
    deleteRestaurant,
} from '../controllers/restaurant.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.post('/', authMiddleware, createRestaurant);
router.get('/:id', getRestaurantById);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);
router.post('/upload', upload.single('image'), uploadRestaurantImage);

export default router;

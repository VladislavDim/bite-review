import express from 'express';
import {
    getAllRestaurants,
    createRestaurant,
    getRestaurantById,
    uploadRestaurantImage,
}
    from '../controllers/restaurant.controller.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.post('/', createRestaurant);
router.get('/:id', getRestaurantById);
router.post('/upload', upload.single('image'), uploadRestaurantImage);

export default router;

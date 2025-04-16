import express from 'express';
import { getAllRestaurants, createRestaurant, } from '../controllers/restaurant.controller.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.post('/', createRestaurant);

export default router;

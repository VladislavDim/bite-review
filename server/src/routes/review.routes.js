import express from 'express';
import {
    createReview,
    getReviewsByRestaurant
}
    from '../controllers/review.controller.js';

const router = express.Router();

router.post('/', createReview);

router.get('/:restaurantId', getReviewsByRestaurant);

export default router;

import express from 'express';
import {
    createReview,
    getAllReviews,
    getReviewsByRestaurant
}
    from '../controllers/review.controller.js';
    
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, createReview);
router.get('/', getAllReviews);
router.get('/:restaurantId', getReviewsByRestaurant);

export default router;

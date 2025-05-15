import { getRestaurantById, recalculateAverageRating } from './restaurant.service.js';
import Review from '../models/review.model.js';

/**
 * POST /api/reviews
 * Creates a new review for a restaurant.
 * Prevents the owner from reviewing their own restaurant.
 * Automatically updates the average rating and review count.
 */
export const createReviewForRestaurant = async ({ restaurantId, userId, rating, comment }) => {
    const restaurantDoc = await getRestaurantById(restaurantId);

    if (!restaurantDoc) {
        const error = new Error("Restaurant not found");
        error.status = 404;
        throw error;
    }

    if (restaurantDoc.owner._id.toString() === userId.toString()) {
        const error = new Error("Owners cannot review their own restaurants.");
        error.status = 403;
        throw error;
    }

    const review = await Review.create({
        restaurant: restaurantId,
        user: userId,
        rating,
        comment,
    });

    await recalculateAverageRating(restaurantId);

    return review;
};

/**
 * GET /api/reviews or /api/reviews/:restaurantId
 * Returns reviews. If restaurantId is provided, filters by restaurant.
 * Sorted by most recent first.
 */
export const getReviews = async (restaurantId = null) => {
    const filter = restaurantId ? { restaurant: restaurantId } : {};

    return await Review.find(filter)
        .populate("user", "username")
        .populate("restaurant", "name")
        .sort({ createdAt: -1 });
};

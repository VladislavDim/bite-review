import Restaurant from '../models/restaurant.model.js';
import Review from '../models/review.model.js';
import { deleteFromCloudinaryByUrl } from '../utils/cloudinary.js';


/**
 * GET /api/restaurants
 * Returns all restaurants with related city and owner
 */
export const getAllRestaurants = async () => {
    const restaurants = await Restaurant.find()
        .populate('city', 'name')
        .populate('owner', 'username');

    return restaurants;
};

/**
 * GET /api/restaurants/:id
 * Returns restaurant with current id
 */
export const getRestaurantById = async (id) => {
    const restaurant = await Restaurant.findById(id)
        .populate('city', 'name')
        .populate('owner', 'username');

    return restaurant;
};

/**
 * POST /api/restaurants
 * Creates a new restaurant
 */
export const createRestaurant = async (data, userId) => {
    const {
        name,
        description,
        location,
        city,
        features,
        images,
    } = data;

    const newRestaurant = await Restaurant.create({
        name,
        description,
        location,
        city,
        owner: userId,
        images: images || [],
        features,
    });

    return newRestaurant;
};

/**
 * PUT /api/restaurants/:id
 * Updates restaurant if the user is the owner
 */
export const updateRestaurant = async (restaurantId, data, userId) => {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new Error('Restaurant not found');
    }

    // Check if current user is the owner
    if (restaurant.owner.toString() !== userId.toString()) {
        throw new Error('Not authorized to update this restaurant');
    }

    Object.assign(restaurant, data); // merge new data
    await restaurant.save();

    return restaurant;
};

/**
 * DELETE /api/restaurants/:id
 * Deletes a restaurant if the user is the owner
 */
export const deleteRestaurant = async (restaurantId, userId) => {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new Error('Restaurant not found');
    }

    if (restaurant.owner.toString() !== userId.toString()) {
        throw new Error('Not authorized to delete this restaurant');
    }

    const imageUrls = restaurant.images || [];

    await Promise.all(
        imageUrls.map(deleteFromCloudinaryByUrl)
    );

    await restaurant.deleteOne();
    return restaurant;
};

/**
 * PATCH /api/restaurants/:id/upload-image
 * Adds a new image path to the restaurant's images array
 */
export const addImages = async (id, imagePaths) => {
    return Restaurant.findByIdAndUpdate(
        id,
        { $push: { images: { $each: imagePaths } } },
        { new: true }
    );
};

/**
 * PATCH /api/restaurants/:id/update-images
 * Replaces the restaurant's images array with a new one
 */
export const replaceImages = async (id, imagePaths) => {
    return Restaurant.findByIdAndUpdate(
        id,
        { images: imagePaths },
        { new: true }
    );
};

/**
 * Internal: Recalculates the average rating and review count for a restaurant.
 * Called after creating, updating or deleting a review.
 */
export const recalculateAverageRating = async (restaurantId) => {
    const reviews = await Review.find({ restaurant: restaurantId });

    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const average = total / reviews.length;

    await Restaurant.findByIdAndUpdate(restaurantId, {
        averageRating: average.toFixed(1),
        reviewCount: reviews.length,
    });
};

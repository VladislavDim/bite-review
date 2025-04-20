import Restaurant from '../models/restaurant.model.js';

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
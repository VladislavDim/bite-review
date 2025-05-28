import * as restaurantService from '../services/restaurant.service.js';
import { deleteFromCloudinaryByUrl, uploadToCloudinary } from '../utils/cloudinary.js';

/**
 * GET /api/restaurants
 * Returns all restaurants with related city and owner
 */
export const getAll = async (req, res) => {
    try {
        const restaurants = await restaurantService.getAllRestaurants();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurants', errorMessage: error.message });
    }
};

/**
 * GET /api/restaurants/:id
 * Returns restaurant with current id
 */
export const getById = async (req, res) => {
    try {
        const restaurant = await restaurantService.getRestaurantById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurant', errorMessage: error.message });
    }
};

/**
 * PATCH /api/restaurants/:id/update-images
 * Replaces restaurant image paths and deletes removed images from disk
 */
export const updateImages = async (req, res) => {
    const { id } = req.params;
    const newImageUrls = req.body; // array of Cloudinary URLs

    try {
        const restaurant = await restaurantService.getRestaurantById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found.' });
        }

        const oldUrls = restaurant.images || [];
        const removed = oldUrls.filter(url => !newImageUrls.includes(url));

        await Promise.all(removed.map(deleteFromCloudinaryByUrl));

        const updatedRestaurant = await restaurantService.replaceImages(id, newImageUrls);
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        console.error('Failed to update restaurant images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PATCH /api/restaurants/:id/upload-image
 * Uploads an image for a specific restaurant
 */
export const uploadImage = async (req, res) => {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one image file is required.' });
    }

    try {
        const restaurant = await restaurantService.getRestaurantById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found.' });
        }

        const imageUrls = await Promise.all(
            req.files.map(file => uploadToCloudinary(file.buffer, 'bite-review/restaurants'))
        );

        const updatedRestaurant = await restaurantService.addImages(id, imageUrls);
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        console.error('Failed to upload restaurant images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * POST /api/restaurants
 * Creates a new restaurant
 */
export const create = async (req, res) => {
    const { name, location, city, description, features } = req.body;

    if (!name || !location || !city || !description) {
        return res.status(400).json({ message: 'Name, location, city, and description are required.' });
    }

    try {
        const restaurantData = {
            name,
            location,
            city,
            description,
            features,
            images: [],
        };

        const newRestaurant = await restaurantService.createRestaurant(restaurantData, req.user._id);

        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error('Failed to create restaurant:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PUT /api/restaurants/:id
 * Update an existing restaurant
 */
export const update = async (req, res) => {
    try {
        const updated = await restaurantService.updateRestaurant(
            req.params.id,
            req.body,
            req.user._id
        );

        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update restaurant', errorMessage: error.message });
    }
};

/**
 * DELETE /api/restaurants/:id
 * Delete a restaurant
 */
export const remove = async (req, res) => {
    try {
        const deleted = await restaurantService.deleteRestaurant(
            req.params.id,
            req.user._id
        );

        res.json({ deleted, message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete restaurant', errorMessage: error.message });
    }
};

import * as restaurantService from '../services/restaurant.service.js';
import fs from 'fs/promises';

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
 * PATCH /api/restaurants/:id/upload-image
 * Uploads an image for a specific restaurant
 */
export const uploadImage = async (req, res) => {
    const { id } = req.params;

    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided.' });
    }

    try {
        const restaurant = await restaurantService.getRestaurantById(id);

        if (!restaurant) {
            await fs.unlink(`uploads/${req.file.filename}`);
            return res.status(404).json({ message: 'Restaurant not found.' });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        const updatedRestaurant = await restaurantService.updateImage(id, imagePath);

        res.status(200).json(updatedRestaurant);
    } catch (error) {
        console.error('Failed to upload restaurant image:', error);

        if (req.file) {
            await fs.unlink(`uploads/${req.file.filename}`);
        }

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

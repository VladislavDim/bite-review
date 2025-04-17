import express from 'express';
import { getAllRestaurants, createRestaurant, getRestaurantById, } from '../controllers/restaurant.controller.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.post('/', createRestaurant);
router.get('/:id', getRestaurantById);
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ imageUrl });
});

export default router;

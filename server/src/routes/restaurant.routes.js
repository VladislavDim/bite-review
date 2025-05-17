import express from 'express';
import {
    getAll,
    create,
    getById,
    uploadImage,
    update,
    remove,
    updateImages,
} from '../controllers/restaurant.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import uploadRestaurant from "../middlewares/restaurant.upload.middleware.js"

const router = express.Router();

// Public routes
router.get('/', getAll);
router.get('/:id', getById);

// Protected routes
router.post('/', authMiddleware, create);
router.put('/:id', authMiddleware, update);
router.patch('/:id/upload-image', authMiddleware, uploadRestaurant.array('images'), uploadImage);
router.patch('/:id/update-images', authMiddleware, updateImages);
router.delete('/:id', authMiddleware, remove);

export default router;

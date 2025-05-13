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
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', authMiddleware, create);
router.patch('/:id/upload-image', authMiddleware, upload.array('images'), uploadImage);
router.patch('/:id/update-images', authMiddleware, updateImages);
router.put('/:id', authMiddleware, update);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', authMiddleware, remove);

export default router;

import express from 'express';

import {
    getAll,
    create,
    getById,
    uploadImage,
    update,
    remove,
} from '../controllers/restaurant.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', authMiddleware, upload.single('image'), create);
router.patch('/:id/upload-image', authMiddleware, upload.single('image'), uploadImage);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;

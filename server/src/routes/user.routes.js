import express from 'express';
import uploadAvatarMiddleware from '../middlewares/user.avatar.upload.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import {
    getAll,
    findById,
    updateProfile,
}
    from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', findById);
router.patch('/me', authMiddleware, uploadAvatarMiddleware.single('avatar'), updateProfile);

export default router;

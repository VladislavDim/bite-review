import cloudinary from '../config/cloudinary.config.js';
import streamifier from 'streamifier';
import {
    getUserById,
    updateUserAvatar,
    updateUserProfileFields,
    updateUserPassword
} from '../services/user.service.js';

/**
 * GET /api/users
 * Returns all users
 */
export const getAll = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

/**
 * GET /api/users/:id
 * Returns user by ID
 */
export const findById = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
};

export const updateProfile = async (req, res) => {
    const userId = req.user._id;
    const { username, email, oldPassword, newPassword } = req.body;

    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 1. Handle avatar upload via Cloudinary
        if (req.file) {
            if (user.avatar && user.avatar.includes('res.cloudinary.com')) {
                const publicId = user.avatar.split('/').pop().split('.')[0]; // crude method
                await cloudinary.uploader.destroy(`bite-review/avatars/${publicId}`);
            }

            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'bite-review/avatars',
                        public_id: `${userId}-avatar`,
                        overwrite: true,
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

            await updateUserAvatar(userId, uploadResult.secure_url);
        }

        // 2. Update profile fields if changed
        const updates = {};
        if (username && username !== user.username) updates.username = username;
        if (email && email !== user.email) updates.email = email;

        if (Object.keys(updates).length > 0) {
            await updateUserProfileFields(userId, updates);
        }

        // 3. Update password if requested
        if (oldPassword && newPassword) {
            try {
                await updateUserPassword(userId, oldPassword, newPassword);
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }

        // 4. Send response
        const updatedUser = await getUserById(userId);
        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
            },
        });

    } catch (error) {
        console.error('Profile update failed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
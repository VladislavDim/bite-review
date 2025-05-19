import {
    getUserById,
    updateUserAvatar,
    updateUserProfileFields,
    updateUserPassword
} from '../services/user.service.js';
import { deleteImage } from '../utils/deleteImage.js';
import paths from '../utils/paths.js';

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
    const { username, email, oldPassword, newPassword, confirmPassword } = req.body;

    try {
        const user = await getUserById(userId);
        if (!user) {
            if (req.file) {
                await deleteImage(`${paths.avatarUploads}/${req.file.filename}`);
            }
            return res.status(404).json({ message: 'User not found' });
        }

        // 1. Handle avatar if file is present
        if (req.file) {
            if (user.avatar) {
                const oldFilename = user.avatar.split('/').pop();
                await deleteImage(`${paths.avatarUploads}/${oldFilename}`);
            }
            const avatarPath = `${paths.avatarUploadsUrl}/${req.file.filename}`;
            await updateUserAvatar(userId, avatarPath);
        }

        // 2. Update profile fields if changed
        const updates = {};
        if (username && username !== user.username) updates.username = username;
        if (email && email !== user.email) updates.email = email;
        if (Object.keys(updates).length > 0) {
            await updateUserProfileFields(userId, updates);
        }

        // 3. Update password if all required fields are valid
        if (oldPassword && newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: 'New passwords do not match' });
            }
            await updateUserPassword(userId, oldPassword, newPassword);
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update failed:', error);
        if (req.file) {
            await deleteImage(`${paths.avatarUploads}/${req.file.filename}`);
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
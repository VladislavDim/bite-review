import User from '../models/user.model.js';

export const getAllUsers = async () => {
    return User.find().populate('city', 'name');
};

export const getUserById = async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const updateUserAvatar = async (userId, avatarPath) => {
    return User.findByIdAndUpdate(
        userId,
        { avatar: avatarPath },
        { new: true }
    ).select('-password');
};

export const updateUserProfileFields = async (userId, fields) => {
    return await User.findByIdAndUpdate(userId, fields, { new: true });
};

export const updateUserPassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
        throw new Error('Incorrect current password');
    }
    user.password = newPassword;
    await user.save();
};
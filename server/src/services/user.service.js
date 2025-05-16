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

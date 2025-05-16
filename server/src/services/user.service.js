import User from '../models/user.model.js';

export const getAllUsers = async () => {
    return User.find().populate('city', 'name');
};

export const createUser = async ({ username, email, password, city }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    return User.create({ username, email, password, city });
};

export const getUserById = async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

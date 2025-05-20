import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for a given user.
 * @param {Object} user - The user object.
 * @returns {string} JWT token.
 */

export const generateToken = (user) => {
    return jwt.sign(
        {
            sub: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '2d'
        }
    );
};

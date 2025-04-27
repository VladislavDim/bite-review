import BlacklistedToken from '../models/blacklistedToken.model.js';

/**
 * Blacklists a given token
 */
export const blacklistToken = async (token, expiresAt) => {
    return await BlacklistedToken.create({ token, expiresAt });
};

/**
 * Checks if a token is blacklisted
 */
export const isTokenBlacklisted = async (token) => {
    return await BlacklistedToken.findOne({ token });
};

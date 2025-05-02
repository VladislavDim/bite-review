import path from 'path';
import rateLimit from 'express-rate-limit';
import { ALLOWED_IMAGE_EXTENSIONS_WITH_SVG } from '../utils/image.rules.js';

const defaultImageExts = ALLOWED_IMAGE_EXTENSIONS_WITH_SVG;

export const createStaticFileGuard = (allowedExtensions = defaultImageExts, cacheControl = null) => {
    return (req, res, next) => {
        const ext = path.extname(req.path).toLowerCase();

        if (!allowedExtensions.includes(ext)) {
            return res.status(403).send('Forbidden file type');
        }

        if (cacheControl) {
            res.set('Cache-Control', cacheControl);
        }

        next();
    };
};

export const staticRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: 'Too many requests for static files',
});

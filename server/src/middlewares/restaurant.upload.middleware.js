import path from 'path';
import {
    MAX_IMAGE_SIZE_BYTES,
    isValidImageExtension,
    isValidImageMimetype,
}
    from '../utils/image.rules.js';
import { createUploadMiddleware } from './upload.factory.middleware.js';
import paths from '../utils/paths.js';

const restaurantFileFilter = (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (isValidImageExtension(ext) && isValidImageMimetype(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Only image files are allowed (${ALLOWED_IMAGE_EXTENSIONS.join(', ')})`), false);
    }
};

const uploadRestaurant = createUploadMiddleware({
    uploadDir: paths.restaurantUploads,
    limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
    fileFilter: restaurantFileFilter,
});

export default uploadRestaurant;
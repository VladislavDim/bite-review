import paths from '../utils/paths.js';
import { createUploadMiddleware } from './upload.factory.middleware.js';
import {
    isValidImageFile,
    ALLOWED_IMAGE_TYPES,
    MAX_IMAGE_SIZE_BYTES,
} from '../utils/image.rules.js';

const restaurantFileFilter = (_, file, cb) => {
    if (isValidImageFile(file, ALLOWED_IMAGE_TYPES)) {
        cb(null, true);
    } else {
        cb(
            new Error(`Only image types are allowed: ${ALLOWED_IMAGE_TYPES.join(', ')}`),
            false
        );
    }
};

const uploadRestaurant = createUploadMiddleware({
    uploadDir: paths.restaurantUploads,
    limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
    fileFilter: restaurantFileFilter,
});

export default uploadRestaurant;

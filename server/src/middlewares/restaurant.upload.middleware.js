import multer from 'multer';
import {
    isValidImageFile,
    ALLOWED_IMAGE_TYPES,
    MAX_IMAGE_SIZE_BYTES
} from '../utils/image.rules.js';

// Multer filter for restaurant images
const restaurantFileFilter = (_, file, cb) => {
    if (isValidImageFile(file, ALLOWED_IMAGE_TYPES)) {
        cb(null, true);
    } else {
        cb(new Error(`Only image types are allowed: ${ALLOWED_IMAGE_TYPES.join(', ')}`), false);
    }
};

// Memory storage for restaurant images
const storage = multer.memoryStorage();

const uploadRestaurant = multer({
    storage,
    limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
    fileFilter: restaurantFileFilter,
});

export default uploadRestaurant;

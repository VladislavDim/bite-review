import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import {
    ALLOWED_IMAGE_EXTENSIONS,
    MAX_IMAGE_SIZE_BYTES,
    isValidImageExtension,
    isValidImageMimetype
} from '../utils/image.rules.js';

// Ensure uploads/ directory exists
const uploadDir = 'uploads/restaurants';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${uuidv4()}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (isValidImageMimetype(file.mimetype) && isValidImageExtension(ext)) {
        cb(null, true);
    } else {
        cb(new Error(`Only image files are allowed (${ALLOWED_IMAGE_EXTENSIONS.join(', ')})`), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
});

export default upload;

import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const createUploadMiddleware = ({ uploadDir, limits, fileFilter, useMemory = false }) => {
    let storage;

    if (useMemory) {
        storage = multer.memoryStorage();
    } else {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        storage = multer.diskStorage({
            destination: (_, __, cb) => cb(null, uploadDir),
            filename: (_, file, cb) => {
                const ext = path.extname(file.originalname).toLowerCase();
                cb(null, `${uuidv4()}${ext}`);
            },
        });
    }

    return multer({ storage, limits, fileFilter });
};

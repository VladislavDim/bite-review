import paths from '../utils/paths.js';
import { createUploadMiddleware } from './upload.factory.middleware.js';
import {
    isValidImageFile,
    ALLOWED_AVATAR_IMAGE_TYPES,
    MAX_AVATAR_IMAGE_SIZE_BYTES,
} from '../utils/image.rules.js';

const avatarFileFilter = (_, file, cb) => {
    if (isValidImageFile(file, ALLOWED_AVATAR_IMAGE_TYPES)) {
        cb(null, true);
    } else {
        cb(
            new Error(`Only avatar image types are allowed: ${ALLOWED_AVATAR_IMAGE_TYPES.join(', ')}`),
            false
        );
    }
};

const uploadAvatar = createUploadMiddleware({
    uploadDir: paths.avatarUploads,
    limits: { fileSize: MAX_AVATAR_IMAGE_SIZE_BYTES },
    fileFilter: avatarFileFilter,
});

export default uploadAvatar;

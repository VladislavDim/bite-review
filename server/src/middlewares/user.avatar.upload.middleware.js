import {
    ALLOWED_AVATAR_IMAGE_TYPES,
    MAX_AVATAR_IMAGE_SIZE_BYTES,
} from '../utils/image.validation.js';
import { createUploadMiddleware } from './createUploadMiddleware.js';
import paths from '../utils/paths.js';

const avatarFileFilter = (_, file, cb) => {
    if (ALLOWED_AVATAR_IMAGE_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Only avatar image types are allowed (${ALLOWED_AVATAR_IMAGE_TYPES.join(', ')})`), false);
    }
};

const uploadAvatar = createUploadMiddleware({
    uploadDir: paths.avatarUploads,
    limits: { fileSize: MAX_AVATAR_IMAGE_SIZE_BYTES },
    fileFilter: avatarFileFilter,
});

export default uploadAvatar;

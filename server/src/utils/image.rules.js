import path from 'path';

// Allowed extensions
export const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
export const ALLOWED_IMAGE_EXTENSIONS_WITH_SVG = [...ALLOWED_IMAGE_EXTENSIONS, '.svg'];

// General image MIME types (e.g., for restaurant images)
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

// Avatar image MIME types
export const ALLOWED_AVATAR_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_AVATAR_IMAGE_SIZE_MB = 1;
export const MAX_AVATAR_IMAGE_SIZE_BYTES = MAX_AVATAR_IMAGE_SIZE_MB * 1024 * 1024;
export const MAX_AVATAR_IMAGE_WIDTH = 800;
export const MAX_AVATAR_IMAGE_HEIGHT = 800;
export const MIN_AVATAR_IMAGE_WIDTH = 200;
export const MIN_AVATAR_IMAGE_HEIGHT = 200;

// Utility: check file extension
export const isValidImageExtension = (ext) =>
    ALLOWED_IMAGE_EXTENSIONS.includes(ext.toLowerCase());

// Utility: check MIME type starts with 'image/'
export const isValidImageMimetype = (mimetype) =>
    mimetype.startsWith('image/');

// Combined utility: validate by mimetype AND extension
export const isValidImageFile = (
    file,
    allowedMimeTypes,
    allowedExtensions = ALLOWED_IMAGE_EXTENSIONS
) => {
    const ext = path.extname(file.originalname).toLowerCase();
    return (
        allowedMimeTypes.includes(file.mimetype.toLowerCase()) &&
        allowedExtensions.includes(ext)
    );
};

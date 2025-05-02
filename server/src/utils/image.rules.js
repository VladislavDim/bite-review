export const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
export const ALLOWED_IMAGE_EXTENSIONS_WITH_SVG = [...ALLOWED_IMAGE_EXTENSIONS, '.svg'];

export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export const isValidImageExtension = (ext) =>
    ALLOWED_IMAGE_EXTENSIONS.includes(ext.toLowerCase());

export const isValidImageMimetype = (mimetype) =>
    mimetype.startsWith('image/');

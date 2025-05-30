import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.config.js';

export const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );

        Readable.from(buffer).pipe(stream);
    });
};

export const deleteFromCloudinaryByUrl = async (url) => {
    try {
        const uploadIndex = url.indexOf('/upload/');
        if (uploadIndex === -1) {
            throw new Error('Invalid Cloudinary URL format');
        }

        // Extract everything after "/upload/"
        const pathWithVersion = url.substring(uploadIndex + 8);

        // Split into segments: e.g., ['v12345', 'folder', 'file.jpg']
        const parts = pathWithVersion.split('/');

        // Remove version prefix if present (starts with "v")
        const publicIdParts = parts[0].startsWith('v') ? parts.slice(1) : parts;

        // Join back into full path, e.g., "folder/file.jpg"
        const publicIdWithExt = publicIdParts.join('/');

        // Remove extension, keeping only the public_id
        const dotIndex = publicIdWithExt.lastIndexOf('.');
        const publicId = dotIndex !== -1
            ? publicIdWithExt.substring(0, dotIndex)
            : publicIdWithExt;

        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error('Failed to delete from Cloudinary:', err.message);
    }
};


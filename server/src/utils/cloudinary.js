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
        const parts = url.split('/');
        const publicIdWithExt = parts.slice(-2).join('/').split('.')[0]; 
        await cloudinary.uploader.destroy(publicIdWithExt);
    } catch (err) {
        console.error('Failed to delete from Cloudinary:', err.message);
    }
};

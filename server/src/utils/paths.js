import path from 'path';
const __dirname = path.resolve();

const paths = {
    root: __dirname,

    // Base upload directory
    uploads: path.join(__dirname, 'uploads'),

    // Specific upload targets
    restaurantUploads: path.join(__dirname, 'uploads/restaurants'),
    avatarUploads: path.join(__dirname, 'uploads/avatars'),

    // Public URL paths for client-side access
    restaurantUploadsUrl: '/uploads/restaurants',
    avatarUploadsUrl: '/uploads/avatars',

    // Other app data
    data: path.join(__dirname, 'data'),
};

export default paths;

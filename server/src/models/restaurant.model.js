import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City',
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        images: [
            {
                type: String,
                required: true,
                trim: true,
            }
        ],
        features: [
            {
                type: String,
                trim: true,
            }
        ],
        averageRating: {
            type: Number,
            default: 0,
        },
        reviewCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;

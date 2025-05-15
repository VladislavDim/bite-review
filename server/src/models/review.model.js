import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      delete ret.id;
  
      if (ret.createdAt) {
        ret.timestamp = new Date(ret.createdAt).getTime();
      }
  
      return ret;
    },
  });

const Review = mongoose.model('Review', reviewSchema);

export default Review;

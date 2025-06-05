import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City',
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        avatar: {
            type: String,
            default: '',
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerification: {
            code: String,
            expires: Date,
        },

        //Fields for password reset
        resetToken: {
            type: String,
            default: null,
        },
        resetTokenExpires: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

//  Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

//  Method to compare password
userSchema.methods.comparePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

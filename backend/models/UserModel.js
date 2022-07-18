import mongoose from 'mongoose';

const userScheme = mongoose.Schema({
    f_name: {
        type: String,
        required: true,
    },
    l_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    OTP: {
        type: String,
        required: false,
    },
    staff: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model('User', userScheme);
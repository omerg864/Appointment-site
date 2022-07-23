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
    reset_token: {
        type: String,
        required: false,
        unique: true,
    },
    staff: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model('User', userScheme);
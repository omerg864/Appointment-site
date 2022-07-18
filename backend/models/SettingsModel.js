import mongoose from "mongoose";


const SettingsSchema = new mongoose.Schema({
    site_header: {
        type: String,
        required: true,
    },
    site_title: {
        type: String,
        required: true,
    },
    site_description: {
        type: String,
    },
    rtl: {
        type: Boolean,
        default: false,
    },
    register_code: {
        type: String,
        required: true,
        default: "123456",
    },
    schedule: [
        {
            start_time: {
                type: String,
                required: true,
            },
            end_time: {
                type: String,
                required: true,
            },
            breaks: [{
                type: String,
            }],
            interval: {
                type: String,
                required: true,
                default: "30m",
            }
        }
    ]
}, { timestamps: true });


export default mongoose.model("Settings", SettingsSchema);
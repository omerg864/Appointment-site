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
        required: true,
    },
    rtl: {
        type: Boolean,
        default: false,
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
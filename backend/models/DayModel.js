import mongoose from "mongoose";


const DaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: false,
    }],
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
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
}, { timestamps: true });

export default mongoose.model("Day", DaySchema);
import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    notes: {
        type: String,
        required: false,
        default: "",
    }
}, { timestamps: true });

export default mongoose.model("Appointment", AppointmentSchema);
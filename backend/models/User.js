import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    isVerified: { type: Boolean, default: false },
    phone: { type: String, default: "" },      // new field
    address: { type: String, default: "" },    // new field
}, { timestamps: true });

export default mongoose.model("User", userSchema);

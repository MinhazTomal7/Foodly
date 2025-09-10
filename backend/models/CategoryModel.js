import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g., Burgers
    description: { type: String },                         // optional
    img: { type: String },                                 // optional category image
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Category", categorySchema);

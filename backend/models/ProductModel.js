// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    img: { type: String }, // will store image file path (uploaded via multer)
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }, // store price at time of order
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "pending" }, // pending, completed, cancelled
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);

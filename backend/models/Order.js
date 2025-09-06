const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
            quantity: { type: Number, default: 1 },
        },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "delivered"], default: "pending" },
    promoCode: { type: String }, // optional
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);

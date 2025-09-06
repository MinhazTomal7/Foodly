const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);

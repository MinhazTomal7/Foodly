const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// 👉 Create Order
exports.createOrder = async (req, res) => {
    try {
        const { items, promoCode } = req.body;

        // Calculate totalPrice
        let totalPrice = 0;
        for (const i of items) {
            const menuItem = await MenuItem.findById(i.menuItem);
            if (!menuItem) return res.status(404).json({ message: "Menu item not found" });
            totalPrice += menuItem.price * i.quantity;
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            totalPrice,
            promoCode,
        });

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// 👉 Get User Orders
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.menuItem", "name price")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// 👉 Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.menuItem", "name price")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

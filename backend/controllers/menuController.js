const MenuItem = require("../models/MenuItem");

// 👉 Get all menu items
exports.getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find().populate("category");
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// 👉 Create menu item (Admin only)
exports.createMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;
        const menuItem = await MenuItem.create({ name, description, price, category, image });
        res.status(201).json(menuItem);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

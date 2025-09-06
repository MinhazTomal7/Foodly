const Category = require("../models/Category");

// Admin: Create Category
exports.createCategory = async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    try {
        const { name, description } = req.body;
        const category = await Category.create({ name, description });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Users: Get all Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

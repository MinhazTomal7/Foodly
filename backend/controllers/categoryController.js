
import Category from "../models/CategoryModel.js";


export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single category
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new category
export const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const img = req.file ? req.file.path : "";

        const category = new Category({ name, description, img });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const img = req.file ? req.file.path : undefined;

        const updatedData = { name, description };
        if (img) updatedData.img = img;

        const updated = await Category.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

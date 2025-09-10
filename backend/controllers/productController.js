// controllers/productController.js
import Product from "../models/ProductModel.js";

// Get all products (with optional query: category or search)
export const getAllProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let filter = {};

        if (category) filter.category = category;
        if (search) filter.title = { $regex: search, $options: "i" };

        const products = await Product.find(filter).populate("category");
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new product (Admin only)
export const addProduct = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        // Multer file upload
        const imgPath = req.file ? `/uploads/${req.file.filename}` : null;

        const product = new Product({
            title,
            description,
            price,
            img: imgPath,
            category
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update product (Admin only)
export const updateProduct = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        let updateData = { title, description, price, category };

        if (req.file) {
            updateData.img = `/uploads/${req.file.filename}`;
        }

        const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updated) return res.status(404).json({ message: "Product not found" });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete product (Admin only)
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Product not found" });

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

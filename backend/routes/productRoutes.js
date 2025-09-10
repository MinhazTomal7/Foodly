// routes/productRoutes.js
import express from "express";
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";



const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin routes (with image upload)
router.post("/", /* adminAuth, */ upload.single("img"), addProduct);
router.put("/:id", /* adminAuth, */ upload.single("img"), updateProduct);
router.delete("/:id", /* adminAuth, */ deleteProduct);

export default router;

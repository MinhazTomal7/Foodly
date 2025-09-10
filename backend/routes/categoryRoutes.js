import express from "express";
import {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

import upload from "../middleware/upload.js"; // Multer middleware

const router = express.Router();

// Public routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Admin routes (with file upload)
router.post("/", upload.single("img"), /* adminAuth, */ addCategory);
router.put("/:id", upload.single("img"), /* adminAuth, */ updateCategory);
router.delete("/:id", /* adminAuth, */ deleteCategory);

export default router;

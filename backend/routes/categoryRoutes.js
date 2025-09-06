const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

// Admin creates category
router.post("/", protect, createCategory);

// Users get all categories
router.get("/", getCategories);

module.exports = router;

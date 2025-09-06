const express = require("express");
const router = express.Router();
const { getMenuItems, createMenuItem } = require("../controllers/menuController");
const { protect } = require("../middleware/authMiddleware");

// Public route
router.get("/", getMenuItems);

// Admin route
router.post("/", protect, createMenuItem);

module.exports = router;

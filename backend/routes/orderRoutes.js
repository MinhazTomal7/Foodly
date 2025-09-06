const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Create order (user)
router.post("/", protect, createOrder);

// Get my orders (user)
router.get("/myorders", protect, getMyOrders);

// Get all orders (admin)
router.get("/", protect, getAllOrders);

module.exports = router;

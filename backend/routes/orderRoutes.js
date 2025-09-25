import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createCODOrder, getUserOrders } from "../controllers/orderController.js";
import { getAllOrders, updateOrderStatus } from "../controllers/adminOrderController.js";

const router = express.Router();

// User routes
router.post("/cod", protect, createCODOrder);  // COD order
router.get("/", protect, getUserOrders);       // User orders

// Admin routes
router.get("/admin", getAllOrders);            // Get all orders
router.put("/admin/:id", updateOrderStatus);   // Update order status

export default router;

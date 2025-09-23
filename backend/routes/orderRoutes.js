import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createCODOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/cod", protect, createCODOrder);  // COD order route
router.get("/", protect, getUserOrders);       // Get all user orders

export default router;

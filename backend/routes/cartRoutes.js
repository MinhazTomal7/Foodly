// routes/cartRoutes.js
import express from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.use(protect);

router.get("/", getCart);          // Get logged-in user's cart
router.post("/add", addToCart);    // Add product to cart
router.put("/update", updateCartItem); // Update quantity
router.delete("/remove", removeFromCart); // Remove product

export default router;

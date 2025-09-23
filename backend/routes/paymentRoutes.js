import express from "express";
import {
    initPayment,
    paymentSuccess,
    paymentFail,
    paymentCancel,
    paymentIPN
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route to initiate payment
router.post("/init", protect, initPayment);

// For SSLCommerz POST callback
router.post("/payment-success", paymentSuccess);

// For browser redirect (testing or user navigation)
router.get("/payment-success", (req, res) => {
    res.send("✅ Payment success page is working. Redirect from backend works.");
});

router.post("/payment-fail", paymentFail);
router.post("/payment-cancel", paymentCancel);

// IPN webhook
router.post("/PaymentIPN", paymentIPN);

export default router;

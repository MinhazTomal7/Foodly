import express from "express";
import { initPayment, paymentSuccess, paymentFail, paymentCancel, paymentIPN } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/init", protect, initPayment); // protect route
router.post("/PaymentSuccess", paymentSuccess);
router.post("/PaymentFail", paymentFail);
router.post("/PaymentCancel", paymentCancel);
router.post("/PaymentIPN", paymentIPN);

export default router;

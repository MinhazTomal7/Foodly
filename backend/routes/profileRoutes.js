import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProfile);   // GET profile
router.put("/", protect, updateProfile); // UPDATE profile

export default router;

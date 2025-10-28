import express from "express";
import serverless from "serverless-http";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/db.js";

import authRoutes from "../routes/authRoutes.js";
import profileRoutes from "../routes/profileRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js";
import productRoutes from "../routes/productRoutes.js";
import cartRoutes from "../routes/cartRoutes.js";
import paymentRoutes from "../routes/paymentRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";

dotenv.config();
const app = express();

// CORS
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
await connectDB(); // can be top-level await in ESM

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.use("/uploads", express.static("uploads"));

// Health check
app.get("/", (req, res) => res.send("Backend running!"));

// Export handler for Vercel serverless
export const handler = serverless(app);

// Local server
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

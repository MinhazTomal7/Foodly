import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();


const app = express();

// Middleware
const allowedOrigins = [
    "http://localhost:5173",
    "https://foodly-three.vercel.app",
];

// Allow frontend requests + server-to-server callbacks
app.use(cors({
    origin: function (origin, callback) {
        // ✅ Allow requests with no origin (like SSLCommerz server callbacks)
        if (!origin) return callback(null, true);

        // ✅ Allow whitelisted origins or any vercel.app subdomain
        if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
            callback(null, true);
        } else {
            console.log("❌ Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", paymentRoutes);
app.use("/api/orders", orderRoutes);





app.use("/uploads", express.static("uploads"));


// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

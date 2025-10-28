const mongoose = require("mongoose");

let isConnected = false; // Track the connection state

const connectDB = async () => {
    if (isConnected) {
        console.log("🟢 MongoDB already connected");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = conn.connections[0].readyState;
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        // Do NOT use process.exit() on Vercel
        throw error;
    }
};

module.exports = connectDB;

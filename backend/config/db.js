import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
        return conn;
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        throw error;
    }
};

export default connectDB;

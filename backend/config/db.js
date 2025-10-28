// config/db.js
import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(m => m);
    }
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected");
    return cached.conn;
};

export default connectDB;

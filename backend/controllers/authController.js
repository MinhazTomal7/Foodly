import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Signup Controller
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();

        user = new User({ name, email, password: hashedPassword, otp });
        await user.save();

        await transporter.sendMail({
            from: `"Foodly" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your Foodly account",
            text: `Your OTP code is ${otp}`,
        });

        res.status(201).json({ message: "User registered. OTP sent to email" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Verify OTP Controller
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });
        if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        user.isVerified = true;
        user.otp = null;
        await user.save();

        res.json({ message: "Account verified successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Check if verified
        if (!user.isVerified) return res.status(400).json({ message: "Account not verified" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


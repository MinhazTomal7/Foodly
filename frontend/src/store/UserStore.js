import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:5050/api/auth"; // Update if backend URL changes

const useUserStore = create((set, get) => ({
    user: null,          // Stores logged-in user info
    token: null,         // JWT token
    otpSent: false,      // Flag to control OTP step
    loading: false,      // API loading state
    error: null,         // API error message

    // Signup and request OTP
    signup: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post(`${BASE_URL}/signup`, { name, email, password });

            if (res.data.message.includes("OTP sent")) {
                set({ otpSent: true }); // Move to OTP step
            }

            set({ loading: false });
            return { success: true, data: res.data };
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            set({ loading: false, error: errorMsg });
            return { success: false, error: errorMsg };
        }
    },

    // Verify OTP
    verifyOTP: async (email, otp) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post(`${BASE_URL}/verify-otp`, { email, otp });

            if (res.data.token) {
                set({ token: res.data.token, user: { email }, otpSent: false });
                localStorage.setItem("userToken", res.data.token);
            }

            set({ loading: false });
            return { success: true, data: res.data };
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            set({ loading: false, error: errorMsg });
            return { success: false, error: errorMsg };
        }
    },

    // Logout user
    logout: () => {
        set({ user: null, token: null, otpSent: false });
        localStorage.removeItem("userToken");
    },

    // Load user token from localStorage
    loadUserFromStorage: () => {
        const token = localStorage.getItem("userToken");
        if (token) {
            // Optionally decode JWT to get user info
            set({ token, user: { email: "Unknown" } });
        }
    },
}));

export default useUserStore;

import { create } from "zustand";
import axios from "axios";
import { jwtDecode } from "jwt-decode";  // ✅ correct import

const BASE_URL = "http://localhost:5050/api/auth";

const useUserStore = create((set, get) => ({
    user: null,
    token: null,
    otpSent: false,
    loading: false,
    error: null,

    // Signup + request OTP
    sendSignupOTP: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post(`${BASE_URL}/signup`, { name, email, password });
            set({ otpSent: true, loading: false });
            return { success: true, message: res.data.message };
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || err.message });
            return { error: get().error };
        }
    },

    // Verify OTP
    verifyUserOTP: async (email, otp) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post(`${BASE_URL}/verify-otp`, { email, otp });

            if (res.data.token) {
                const decoded = jwtDecode(res.data.token); // ✅ updated
                set({
                    token: res.data.token,
                    user: { _id: decoded.id, email: decoded.email },
                    otpSent: false,
                });
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

    // Login user
    loginUser: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post(`${BASE_URL}/login`, { email, password });

            const decoded = jwtDecode(res.data.token); // ✅ updated
            set({
                token: res.data.token,
                user: { _id: decoded.id, email: decoded.email },
                loading: false,
            });
            localStorage.setItem("userToken", res.data.token);

            return { success: true, data: res.data };
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            set({ loading: false, error: errorMsg });
            return { success: false, error: errorMsg };
        }
    },

    // Logout
    logout: () => {
        set({ user: null, token: null, otpSent: false });
        localStorage.removeItem("userToken");
        window.location.reload();
    },

    // Load from storage
    loadUserFromStorage: () => {
        const token = localStorage.getItem("userToken");
        if (token) {
            const decoded = jwtDecode(token); // ✅ updated
            set({ token, user: { _id: decoded.id, email: decoded.email } });
        }
    },
}));

export default useUserStore;

import { create } from "zustand";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";


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
                const decoded = jwt_decode(res.data.token);
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

            const decoded = jwt_decode(res.data.token);
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
    },

    // ✅ Load user from localStorage on page reload
    loadUserFromStorage: () => {
        const token = localStorage.getItem("userToken");
        if (token) {
            try {
                const decoded = jwt_decode(token);
                set({ token, user: { _id: decoded.id, email: decoded.email } });
            } catch {
                localStorage.removeItem("userToken");
                set({ token: null, user: null });
            }
        }
    },
}));

export default useUserStore;

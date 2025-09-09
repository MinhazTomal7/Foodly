import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:5050/api/profile";

const useProfileStore = create((set) => ({
    profile: null,
    loading: false,
    error: null,

    // Fetch profile
    fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("userToken");
            const res = await axios.get(BASE_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ profile: res.data, loading: false });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || err.message,
            });
        }
    },

    // Update profile
    updateProfile: async (profileData) => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("userToken");
            const res = await axios.put(BASE_URL, profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ profile: res.data.user, loading: false }); // ✅ update state
            return { success: true, message: res.data.message };
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            set({ loading: false, error: errorMsg });
            return { success: false, error: errorMsg };
        }
    },
}));

export default useProfileStore;

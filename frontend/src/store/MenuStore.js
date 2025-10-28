// src/store/MenuStore.js
import { create } from "zustand";
import axios from "axios";

// Use VITE_BACKEND_URL if set (Vercel), otherwise fallback to localhost
const BASE_URL = import.meta.env.VITE_BACKEND_URL
    ? `${import.meta.env.VITE_BACKEND_URL}/api`
    : "http://localhost:5050/api";

const useMenuStore = create((set) => ({
    categories: [],
    products: [],
    loading: false,
    error: null,

    fetchMenuData: async () => {
        set({ loading: true, error: null });
        try {
            const [catRes, prodRes] = await Promise.all([
                axios.get(`${BASE_URL}/categories`),
                axios.get(`${BASE_URL}/products`)
            ]);

            set({
                categories: catRes.data,
                products: prodRes.data,
                loading: false
            });
        } catch (err) {
            console.error("Menu fetch error:", err);
            set({ error: err.message || "Failed to fetch menu data", loading: false });
        }
    },
}));

export default useMenuStore;

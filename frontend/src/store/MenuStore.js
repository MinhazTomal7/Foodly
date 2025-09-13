// src/store/menuStore.js
import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:5050/api";

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
            set({ error: err.message, loading: false });
        }
    },
}));

export default useMenuStore;

import { create } from "zustand";
import axios from "axios";
import useUserStore from "../store/UserStore.js";

const BASE_URL = "http://localhost:5050/api/cart";

const useCartStore = create((set, get) => ({
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,

    // Fetch cart from backend
    fetchCart: async () => {
        const { token } = useUserStore.getState();
        if (!token) return;

        set({ loading: true, error: null });
        try {
            const res = await axios.get(BASE_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ items: res.data.items, totalPrice: res.data.totalPrice, loading: false });
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || err.message });
        }
    },

    // Add item to cart
    addToCart: async (productId, quantity = 1) => {
        const { token } = useUserStore.getState();
        if (!token) return;

        set({ loading: true, error: null });
        try {
            const res = await axios.post(
                `${BASE_URL}/add`,
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            set({ items: res.data.items, totalPrice: res.data.totalPrice, loading: false });
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || err.message });
        }
    },

    // Update quantity
    updateItem: async (productId, quantity) => {
        const { token } = useUserStore.getState();
        if (!token) return;

        set({ loading: true, error: null });
        try {
            const res = await axios.put(
                `${BASE_URL}/update`,
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            set({ items: res.data.items, totalPrice: res.data.totalPrice, loading: false });
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || err.message });
        }
    },

    // Remove item
    removeItem: async (productId) => {
        const { token } = useUserStore.getState();
        if (!token) return;

        set({ loading: true, error: null });
        try {
            const res = await axios.delete(
                `${BASE_URL}/remove`,
                { data: { productId }, headers: { Authorization: `Bearer ${token}` } }
            );
            set({ items: res.data.items, totalPrice: res.data.totalPrice, loading: false });
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message || err.message });
        }
    },

    clearCart: () => set({ items: [], totalPrice: 0 }),
}));

export default useCartStore;

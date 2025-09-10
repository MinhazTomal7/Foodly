// controllers/cartController.js
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

// Utility to calculate total price (rounded to 2 decimals)
const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
        if (item.product && item.product.price) {
            return sum + item.product.price * item.quantity;
        }
        return sum;
    }, 0);
    return parseFloat(total.toFixed(2)); // round to 2 decimals
};

// Get logged-in user's cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
        if (!cart) return res.json({ items: [], totalPrice: 0 });

        const totalPrice = calculateTotal(cart.items);
        res.json({ items: cart.items, totalPrice });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add product to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [{ product: productId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }

        cart.updatedAt = Date.now();
        await cart.save();

        const populatedCart = await cart.populate("items.product");
        const totalPrice = calculateTotal(populatedCart.items);
        res.json({ items: populatedCart.items, totalPrice });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update quantity of a product in cart
export const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

        cart.items[itemIndex].quantity = quantity;
        cart.updatedAt = Date.now();
        await cart.save();

        const populatedCart = await cart.populate("items.product");
        const totalPrice = calculateTotal(populatedCart.items);
        res.json({ items: populatedCart.items, totalPrice });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Remove a product from cart
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        cart.updatedAt = Date.now();
        await cart.save();

        const populatedCart = await cart.populate("items.product");
        const totalPrice = calculateTotal(populatedCart.items);
        res.json({ items: populatedCart.items, totalPrice });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

import Order from "../models/OrderModel.js";
import Cart from "../models/CartModel.js";

// Create Cash on Delivery order
export const createCODOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

        const totalAmount = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0).toFixed(2);

        const order = new Order({
            user: userId,
            items: cart.items.map((i) => ({
                product: i.product._id,
                quantity: i.quantity,
                price: i.product.price,
            })),
            totalAmount,
            transactionId: "COD-" + Date.now(),
            status: "pending",
            paymentMethod: "COD",
        });

        await order.save();
        await Cart.findOneAndUpdate({ user: userId }, { items: [] });

        res.status(201).json({ message: "COD order created", order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all orders of logged-in user
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate("items.product");
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

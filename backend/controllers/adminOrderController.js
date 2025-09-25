// controllers/adminOrderController.js
import Order from "../models/OrderModel.js";

// @desc   Get all orders (admin only)
// @route  GET /api/orders/admin
// @access Private (Admin)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")   // show user info
            .populate("items.product", "title price"); // show product info

        res.json({ orders });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// @desc   Update order status (admin only)
// @route  PUT /api/orders/admin/:id
// @access Private (Admin)
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status || order.status;
        await order.save();

        res.json({ message: "Order status updated", order });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

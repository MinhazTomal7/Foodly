import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
import crypto from "crypto";
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

// Helper function to pick correct URLs
const getURL = (local, prod) => (isProd ? prod : local);

// =======================
// INIT PAYMENT
// =======================
export const initPayment = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0)
            return res.status(400).json({ message: "Cart is empty" });

        const total_amount = cart.items
            .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
            .toFixed(2);

        const tran_id = crypto.randomBytes(8).toString("hex");

        const order = new Order({
            user: userId,
            items: cart.items.map((i) => ({
                product: i.product._id,
                quantity: i.quantity,
                price: i.product.price,
            })),
            totalAmount: total_amount,
            transactionId: tran_id,
            status: "pending",
        });
        await order.save();

        const data = {
            store_id: process.env.STORE_ID,
            store_passwd: process.env.STORE_PASSWD,
            total_amount,
            currency: process.env.CURRENCY,
            tran_id,
            success_url: getURL(
                process.env.SUCCESS_URL,
                "https://foodly-backend-five.vercel.app/api/payment-success"
            ),
            fail_url: getURL(
                process.env.FAIL_URL,
                "https://foodly-backend-five.vercel.app/api/payment-fail"
            ),
            cancel_url: getURL(
                process.env.CANCEL_URL,
                "https://foodly-backend-five.vercel.app/api/payment-cancel"
            ),
            ipn_url: getURL(
                process.env.IPN_URL,
                "https://foodly-backend-five.vercel.app/api/PaymentIPN"
            ),
            emi_option: 0,
            cus_name: req.user.name,
            cus_email: req.user.email,
            cus_phone: req.user.phone || "017XXXXXXXX",
            cus_add1: req.user.address || "Default Address",
            cus_city: "Dhaka",
            cus_postcode: "1207",
            cus_country: "Bangladesh",
            shipping_method: "NO",
            product_name: "Cart Items",
            product_category: "E-commerce",
            product_profile: "general",
        };

        const response = await axios.post(
            process.env.INIT_URL,
            qs.stringify(data),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        if (!response.data.GatewayPageURL)
            return res.status(500).json({
                message: "Payment initiation failed",
                raw: response.data,
            });

        res.json({
            status: "success",
            GatewayPageURL: response.data.GatewayPageURL,
            tran_id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// =======================
// PAYMENT SUCCESS
// =======================
export const paymentSuccess = async (req, res) => {
    try {
        const tran_id = req.body?.tran_id || req.query?.tran_id;
        if (!tran_id) return res.status(400).send("Transaction ID missing");

        const order = await Order.findOne({ transactionId: tran_id });
        if (!order) return res.status(404).send("Order not found");

        order.status = "success";
        await order.save();

        await Cart.findOneAndUpdate({ user: order.user }, { items: [] });

        // ✅ Redirect to frontend (GET request)
        const redirectURL = getURL(
            "http://localhost:5173/payment-success",
            process.env.PROD_SUCCESS_URL
        );

        return res.redirect(`${redirectURL}?tran_id=${tran_id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

// =======================
// PAYMENT FAIL
// =======================
export const paymentFail = async (req, res) => {
    try {
        const tran_id = req.body?.tran_id;
        const order = await Order.findOne({ transactionId: tran_id });

        if (order) {
            order.status = "failed";
            await order.save();
        }

        const redirectURL = getURL(
            "http://localhost:5173/payment-fail",
            process.env.PROD_FAIL_URL
        );

        return res.redirect(redirectURL);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

// =======================
// PAYMENT CANCEL
// =======================
export const paymentCancel = async (req, res) => {
    try {
        const tran_id = req.body?.tran_id;
        const order = await Order.findOne({ transactionId: tran_id });

        if (order) {
            order.status = "cancelled";
            await order.save();
        }

        const redirectURL = getURL(
            "http://localhost:5173/payment-cancel",
            process.env.PROD_CANCEL_URL
        );

        return res.redirect(redirectURL);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

// =======================
// PAYMENT IPN (Webhook)
// =======================
export const paymentIPN = async (req, res) => {
    console.log("IPN Received:", req.body);
    res.json({ message: "IPN Received", data: req.body });
};

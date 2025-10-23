import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/UserStore.js";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.VITE_BACKEND_URL || "http://localhost:5050";

const Orders = () => {
    const { user, loadUserFromStorage } = useUserStore();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadUserFromStorage();
    }, [loadUserFromStorage]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("userToken");
                if (!token) return;

                const res = await axios.get(`${BASE_URL}/api/orders`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data.orders);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, [user]);

    return (
        <div className="px-6 md:px-16 lg:px-24 py-28 min-h-screen bg-[#FFF5E1]">
            <h1 className="text-5xl font-extrabold text-[#4B0000] mb-16 text-center drop-shadow-lg">
                My Orders
            </h1>

            {orders.length === 0 ? (
                <p className="text-center text-[#4B0000] font-semibold text-lg">No orders yet.</p>
            ) : (
                <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-bold text-[#4B0000]">
                                        Order #{order._id.slice(-6)}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Transaction ID: {order.transactionId}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-white ${
                                        order.status === "success"
                                            ? "bg-green-600"
                                            : order.status === "pending"
                                                ? "bg-yellow-500"
                                                : "bg-red-600"
                                    }`}
                                >
                                    {order.status === "success"
                                        ? "Payment Success"
                                        : order.status === "pending"
                                            ? "Payment Pending"
                                            : "Payment Failed"}
                                </span>
                            </div>

                            <p>Total: ${order.totalAmount.toFixed(2)}</p>

                            <div className="flex flex-col gap-2">
                                {order.items.map((item) => (
                                    <div key={item._id} className="flex justify-between">
                                        <span>{item.product.title}</span>
                                        <span>
                                            {item.quantity} x ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;

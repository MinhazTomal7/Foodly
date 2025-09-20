// src/components/Cart.jsx
import { useEffect } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import axios from "axios";
import useCartStore from "../store/CartStore.js";
import useUserStore from "../store/UserStore.js";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

const Cart = () => {
    const { items, totalPrice, fetchCart, updateItem, removeItem } = useCartStore();
    const { user, loadUserFromStorage } = useUserStore();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleIncrease = (item) => updateItem(item.product._id, item.quantity + 1);
    const handleDecrease = (item) => {
        if (item.quantity > 1) updateItem(item.product._id, item.quantity - 1);
    };
    const handleRemove = (item) => removeItem(item.product._id);

    // 🔹 Pay Now handler (SSLCommerz)
    const handlePayNow = async () => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                alert("You must be logged in to pay.");
                return;
            }

            const res = await axios.post(
                `${BASE_URL}/api/init`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (res.data?.GatewayPageURL) {
                window.location.href = res.data.GatewayPageURL;
            } else {
                alert("Payment initiation failed. Check console.");
                console.error(res.data);
            }
        } catch (err) {
            console.error(err);
            alert("Error initiating payment. Check console for details.");
        }
    };

    // 🔹 Cash on Delivery
    const handleCashOnDelivery = () => alert("Order Confirmed! Delivery on the way.");

    const getImageUrl = (imgPath) => {
        if (!imgPath) return "/default-item.png";
        return imgPath.startsWith("/uploads") ? `${BASE_URL}${imgPath}` : imgPath;
    };

    return (
        <div className="px-6 md:px-16 lg:px-24 py-28 bg-[#FFF5E1] min-h-screen">
            <h1 className="text-5xl font-extrabold text-[#4B0000] mb-16 text-center drop-shadow-lg">
                Your Cart
            </h1>

            {items.length === 0 ? (
                <p className="text-center text-[#4B0000] font-semibold text-lg">
                    Your cart is empty.
                </p>
            ) : (
                <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform min-h-[150px] flex flex-col sm:flex-row items-center p-4 gap-4"
                        >
                            <img
                                src={getImageUrl(item.product.img)}
                                alt={item.product.title}
                                className="w-28 h-28 rounded-2xl object-cover shadow-md"
                            />
                            <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 w-full">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg font-bold text-[#4B0000]">{item.product.title}</h2>
                                    <p className="text-[#B35F2C] text-sm">${item.product.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleDecrease(item)}
                                        className="px-3 py-1 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition"
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold text-lg">{item.quantity}</span>
                                    <button
                                        onClick={() => handleIncrease(item)}
                                        className="px-3 py-1 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-[#4B0000] text-lg">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Total & Checkout */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-2xl shadow-md p-6">
                        <span className="text-2xl font-bold text-[#4B0000]">
                            Total: ${totalPrice.toFixed(2)}
                        </span>
                        <div className="flex gap-4 flex-wrap">
                            <button
                                onClick={handlePayNow}
                                className="px-6 py-3 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition"
                            >
                                Pay Now
                            </button>
                            <button
                                onClick={handleCashOnDelivery}
                                className="px-6 py-3 bg-[#FFB89C] text-[#4B0000] font-bold rounded-full hover:bg-[#E6A974] transition"
                            >
                                Cash on Delivery
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

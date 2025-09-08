import React, { useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";

const Cart = () => {
    // Sample cart items
    const [cartItems, setCartItems] = useState([
        { id: 1, title: "Classic Burger", price: 5.99, quantity: 1, img: "/burger.png" },
        { id: 2, title: "Cheese Pizza", price: 8.99, quantity: 2, img: "/pizza.png" },
        { id: 3, title: "Chocolate Shake", price: 3.99, quantity: 1, img: "/shake.png" },
    ]);

    const increaseQty = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handlePayNow = () => {
        alert("Redirecting to Payment Gateway...");
        setTimeout(() => alert("Payment Successful! Delivery on the way."), 1000);
    };

    const handleCashOnDelivery = () => {
        alert("Order Confirmed! Delivery on the way.");
    };

    return (
        <div className="px-6 md:px-16 lg:px-24 py-28 bg-[#FFF5E1] min-h-screen">
            <h1 className="text-5xl font-extrabold text-[#4B0000] mb-16 text-center drop-shadow-lg">
                Your Cart
            </h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-[#4B0000] font-semibold text-lg">
                    Your cart is empty.
                </p>
            ) : (
                <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-3xl shadow-lg p-6 gap-4"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-28 h-28 rounded-2xl object-cover shadow-md"
                            />
                            <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 w-full">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-xl font-bold text-[#4B0000]">
                                        {item.title}
                                    </h2>
                                    <p className="text-[#B35F2C] font-semibold">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => decreaseQty(item.id)}
                                        className="px-3 py-1 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition"
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold text-lg">{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQty(item.id)}
                                        className="px-3 py-1 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-[#4B0000] text-lg">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Total and Checkout */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-3xl shadow-lg p-6">
                        <span className="text-2xl font-bold text-[#4B0000]">
                            Total: ${total.toFixed(2)}
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

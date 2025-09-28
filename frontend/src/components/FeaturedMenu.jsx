// src/components/FeaturedMenu.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useMenuStore from "../store/MenuStore.js";
import useCartStore from "../store/CartStore.js";
import useUserStore from "../store/UserStore.js";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

const FeaturedMenu = () => {
    const { products, fetchMenuData, loading, error } = useMenuStore();
    const { addToCart } = useCartStore();
    const { user } = useUserStore();
    const [featuredItems, setFeaturedItems] = useState([]);

    useEffect(() => {
        fetchMenuData();
    }, [fetchMenuData]);

    useEffect(() => {
        if (products.length) {
            // Take first 4 products (later can filter featured=true from backend)
            setFeaturedItems(products.slice(0, 4));
        }
    }, [products]);

    const handleAddToCart = (product) => {
        if (!user) {
            toast.error("You must be logged in to add to cart!");
            return;
        }
        addToCart(product._id, 1);
        toast.success(`${product.title} added to cart!`);
    };

    const getImageUrl = (imgPath) => {
        if (!imgPath) return "/default-item.png";
        return imgPath.startsWith("/uploads")
            ? `${BASE_URL}${imgPath}`
            : imgPath;
    };

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

    return (
        <section className="bg-white px-6 md:px-16 lg:px-24 py-20">
            <Toaster position="top-right" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#4B0000] text-center mb-12 drop-shadow-lg">
                Popular Items
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {featuredItems.map((item) => (
                    <div
                        key={item._id}
                        className="bg-[#FFF5E1] rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition-transform relative flex flex-col"
                    >
                        {/* Image area now has same background as card */}
                        <div className="w-full h-48 flex items-center justify-center">
                            <img
                                src={getImageUrl(item.img)}
                                alt={item.title}
                                className="max-h-48 object-contain rounded-t-3xl"
                            />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-[#4B0000] mb-1">{item.title}</h3>
                                <p className="text-[#B35F2C] text-sm mb-2 line-clamp-2">{item.description}</p>
                                <span className="text-[#4B0000] font-semibold">${item.price}</span>
                            </div>
                            <button
                                onClick={() => handleAddToCart(item)}
                                className="mt-3 px-3 py-1.5 bg-[#4B0000] text-white text-sm font-semibold rounded-full hover:bg-[#550000] transition flex items-center justify-center gap-1.5"
                            >
                                <ShoppingCart className="w-4 h-4" /> Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <Link
                    to="/menu"
                    className="inline-block px-10 py-4 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition"
                >
                    View Full Menu
                </Link>
            </div>
        </section>
    );
};

export default FeaturedMenu;

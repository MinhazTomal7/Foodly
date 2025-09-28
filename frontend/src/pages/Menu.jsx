// src/components/Menu.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import useMenuStore from "../store/MenuStore.js";
import useCartStore from "../store/CartStore.js";
import useUserStore from "../store/UserStore.js";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

const Menu = () => {
    const navigate = useNavigate();
    const { categories, products, fetchMenuData } = useMenuStore();
    const { addToCart } = useCartStore();
    const { user } = useUserStore();

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchMenuData();
    }, [fetchMenuData]);

    useEffect(() => {
        let filtered = products;

        if (selectedCategory !== "All") {
            filtered = filtered.filter((p) => p.category?.name === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter((p) =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, searchTerm, products]);

    const handleAddToCart = async (product) => {
        if (!user) {
            toast.error("You must be logged in to add to cart!");
            return;
        }

        const toastId = `cart-${product._id}`;
        try {
            await addToCart(product._id, 1);
            toast.dismiss(toastId);
            toast.success(
                <div className="flex flex-col">
                    <span>{product.title} added to cart!</span>
                    <button
                        onClick={() => navigate("/cart")}
                        className="mt-2 px-3 py-1 bg-[#4B0000] text-white rounded-full hover:bg-[#550000] transition"
                    >
                        View Cart
                    </button>
                </div>,
                { id: toastId, duration: 4000 }
            );
        } catch (err) {
            console.error(err);
            toast.error("Failed to add to cart.");
        }
    };

    const getImageUrl = (imgPath) => {
        if (!imgPath) return "/default-item.png";
        return imgPath.startsWith("/uploads")
            ? `${BASE_URL}${imgPath}`
            : imgPath;
    };

    return (
        <div className="px-6 md:px-16 lg:px-24 mt-40 mb-12">
            <Toaster position="top-right" />

            <h1 className="text-4xl md:text-5xl font-extrabold text-[#4B0000] mb-8 text-center drop-shadow-lg">
                Our Menu
            </h1>

            {/* Search & Categories */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                <input
                    type="text"
                    placeholder="Search your favorite..."
                    className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B0000]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={`px-4 py-2 rounded-full font-semibold transition ${
                            selectedCategory === "All"
                                ? "bg-[#4B0000] text-white"
                                : "bg-[#FFF5E1] text-[#4B0000] hover:bg-[#FFB89C] hover:text-white"
                        }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-4 py-2 rounded-full font-semibold transition ${
                                selectedCategory === cat.name
                                    ? "bg-[#4B0000] text-white"
                                    : "bg-[#FFF5E1] text-[#4B0000] hover:bg-[#FFB89C] hover:text-white"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-[#FFF5E1] rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform min-h-[420px]"
                        >
                            {/* Image area same color as card */}
                            <div className="w-full h-60 flex items-center justify-center">
                                <img
                                    src={getImageUrl(product.img)}
                                    alt={product.title}
                                    className="max-h-60 object-contain rounded-t-2xl"
                                />
                            </div>
                            <div className="p-4 flex flex-col justify-between h-[150px]">
                                <div>
                                    <h3 className="text-lg font-bold text-[#4B0000] mb-1">{product.title}</h3>
                                    <p className="text-[#B35F2C] text-sm mb-2">{product.description}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-md font-bold text-[#4B0000]">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <button
                                        className="flex items-center gap-2 px-4 py-1 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        <ShoppingCart className="w-4 h-4" /> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-[#4B0000] font-semibold">
                        No products found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Menu;

import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import useMenuStore from "../store/menuStore";
import useCartStore from "../store/CartStore";
import useUserStore from "../store/userStore";
import toast, { Toaster } from "react-hot-toast";

const Offers = () => {
    const { products, fetchMenuData, loading, error } = useMenuStore();
    const { addToCart } = useCartStore();
    const { user } = useUserStore();
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetchMenuData();
    }, [fetchMenuData]);

    useEffect(() => {
        if (products.length) {
            const comboCategory = products.find(p => p.category?.name === "Combos & Offers")?.category;
            if (comboCategory) {
                const comboProducts = products.filter(
                    (p) => p.category?._id === comboCategory._id
                );
                setOffers(comboProducts);
            }
        }
    }, [products]);

    const handleAddToCart = (offer) => {
        if (!user) {
            toast.error("You must be logged in to add to cart!");
            return;
        }
        addToCart(offer._id, 1);
        toast.success(`${offer.title} added to cart!`);
    };

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

    return (
        <section
            id="offers-section"
            className="relative bg-[#FFF5E1] px-6 md:px-16 lg:px-24 pt-20 pb-36 overflow-hidden"
        >
            <Toaster position="top-right" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#4B0000] text-center mb-12 drop-shadow-lg">
                Special Offers
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {offers.map((offer, index) => (
                    <div
                        key={offer._id}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition-transform relative"
                        style={{
                            animation: "fadeInUp 1s ease forwards",
                            animationDelay: `${index * 0.2}s`,
                            opacity: 0,
                        }}
                    >
                        <img
                            src={
                                offer.img
                                    ? `http://localhost:5050/uploads/${offer.img}`
                                    : "/default-item.png"
                            }
                            alt={offer.title}
                            className="w-full h-48 object-cover rounded-t-3xl"
                            style={{ animation: "float 3s ease-in-out infinite alternate" }}
                        />
                        <div className="p-6 flex flex-col">
                            <h3 className="text-lg font-bold text-[#4B0000] mb-1">{offer.title}</h3>
                            <p className="text-[#B35F2C] text-sm mb-2 line-clamp-2">{offer.description}</p>
                            <span className="text-[#4B0000] font-semibold mb-2">${offer.price}</span>
                            <button
                                onClick={() => handleAddToCart(offer)}
                                className="mt-2 px-3 py-1.5 bg-[#4B0000] text-white text-sm font-semibold rounded-full hover:bg-[#550000] transition w-max flex items-center justify-center gap-1.5"
                            >
                                <ShoppingCart className="w-4 h-4" /> Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Offers;


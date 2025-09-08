import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import OfferImg from "../assets/burger.png"; // Replace with actual images

const Menu = () => {
    const navigate = useNavigate();

    // Sample products
    const allProducts = [
        { id: 1, title: "Classic Burger", category: "Burgers", price: 5.99, desc: "Juicy beef patty with fresh veggies.", img: OfferImg },
        { id: 2, title: "Cheese Pizza", category: "Pizzas", price: 8.99, desc: "Melted cheese with tomato sauce.", img: OfferImg },
        { id: 3, title: "Veggie Pizza", category: "Pizzas", price: 9.99, desc: "Fresh vegetables on a crispy crust.", img: OfferImg },
        { id: 4, title: "Chocolate Shake", category: "Shakes", price: 3.99, desc: "Rich chocolate shake with cream.", img: OfferImg },
        { id: 5, title: "Strawberry Shake", category: "Shakes", price: 3.99, desc: "Fresh strawberry with creamy milk.", img: OfferImg },
        { id: 6, title: "Chicken Burger", category: "Burgers", price: 6.99, desc: "Grilled chicken with lettuce and mayo.", img: OfferImg },
    ];

    const categories = ["All", "Burgers", "Pizzas", "Shakes"];

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let filtered = allProducts;

        if (selectedCategory !== "All") {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter((p) =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, searchTerm]);

    // Offers section
    const offers = [
        { id: 1, title: "Burger Combo", desc: "Burger + Fries + Shake at a special price.", img: OfferImg },
        { id: 2, title: "Pizza Feast", desc: "Cheese + Veggie Pizza combo.", img: OfferImg },
    ];

    const handleGoToCart = (item) => {
        navigate("/cart", { state: { addedItem: item } });
    };

    return (
        <div className="px-6 md:px-16 lg:px-24 mt-40 mb-12"> {/* increased top margin */}

            <h1 className="text-4xl md:text-5xl font-extrabold text-[#4B0000] mb-8 text-center drop-shadow-lg">
                Our Menu
            </h1>

            {/* Search and Categories */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                <input
                    type="text"
                    placeholder="Search your favorite..."
                    className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B0000]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full font-semibold transition ${
                                selectedCategory === cat
                                    ? "bg-[#4B0000] text-white"
                                    : "bg-[#FFF5E1] text-[#4B0000] hover:bg-[#FFB89C] hover:text-white"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-[#FFF5E1] rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform relative"
                        >
                            <img
                                src={product.img}
                                alt={product.title}
                                className="w-full h-40 object-cover rounded-t-2xl"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-[#4B0000] mb-1">{product.title}</h3>
                                <p className="text-[#B35F2C] text-sm mb-2">{product.desc}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-md font-bold text-[#4B0000]">${product.price.toFixed(2)}</span>
                                    <button
                                        className="flex items-center gap-2 px-4 py-1 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition"
                                        onClick={() => handleGoToCart(product)}
                                    >
                                        <ShoppingCart className="w-4 h-4" /> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-[#4B0000] font-semibold">No products found.</p>
                )}
            </div>

            {/* Offers Section */}
            <section className="relative bg-[#FFF5E1] px-6 md:px-16 lg:px-24 pt-12 pb-24 overflow-hidden">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4B0000] text-center mb-8 drop-shadow-lg">
                    Special Offers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {offers.map((offer, index) => (
                        <div
                            key={offer.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform relative"
                            style={{ animation: "fadeInUp 1s ease forwards", animationDelay: `${index * 0.2}s`, opacity: 0 }}
                        >
                            <img
                                src={offer.img}
                                alt={offer.title}
                                className="w-full h-40 object-cover rounded-t-2xl"
                                style={{ animation: "float 3s ease-in-out infinite alternate" }}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-[#4B0000] mb-1">{offer.title}</h3>
                                <p className="text-[#B35F2C] text-sm mb-2">{offer.desc}</p>
                                <button
                                    className="px-4 py-2 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition"
                                    onClick={() => handleGoToCart(offer)}
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <style>
                    {`
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-5px); }
              100% { transform: translateY(0px); }
            }
          `}
                </style>
            </section>
        </div>
    );
};

export default Menu;

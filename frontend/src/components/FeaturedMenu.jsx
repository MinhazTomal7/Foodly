import React from "react";
import { Link } from "react-router-dom";
import MenuItemImg from "../assets/burger.png"; // replace with actual images

const FeaturedMenu = () => {
    const menuItems = [
        { id: 1, name: "Cheesy Burger", desc: "Juicy beef with melted cheese", price: "$8", img: MenuItemImg },
        { id: 2, name: "Crispy Fries", desc: "Golden and crispy", price: "$4", img: MenuItemImg },
        { id: 3, name: "Veggie Pizza", desc: "Fresh veggies with cheese", price: "$10", img: MenuItemImg },
        { id: 4, name: "Chocolate Shake", desc: "Rich and creamy", price: "$5", img: MenuItemImg },
    ];

    return (
        <section className="bg-white px-6 md:px-16 lg:px-24 py-20">
            <h2
                className="text-4xl sm:text-5xl font-extrabold text-[#4B0000] text-center mb-12 drop-shadow-lg"
                style={{ animation: "fadeInUp 1s ease forwards" }}
            >
                Popular Items
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {menuItems.map(item => (
                    <div
                        key={item.id}
                        className="bg-[#FFF5E1] rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition-transform relative"
                        style={{ animation: "fadeInUp 1s ease forwards", animationDelay: `${item.id * 0.2}s`, opacity: 0 }}
                    >
                        <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-t-3xl"
                            style={{ animation: "float 3s ease-in-out infinite alternate" }}
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-[#4B0000] mb-2">{item.name}</h3>
                            <p className="text-[#B35F2C] text-sm mb-4">{item.desc}</p>
                            <span className="text-[#4B0000] font-semibold">{item.price}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* View Full Menu Button */}
            <div className="text-center">
                <Link
                    to="/menu"
                    className="inline-block px-10 py-4 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition"
                    style={{ animation: "fadeInUp 1s ease 0.8s forwards", opacity: 0 }}
                >
                    View Full Menu
                </Link>
            </div>

            {/* Inline keyframes */}
            <style>
                {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
            </style>
        </section>
    );
};

export default FeaturedMenu;

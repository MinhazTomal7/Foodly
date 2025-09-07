import React from "react";
import OfferImg from "../assets/burger.png"; // Replace with actual offer images

const Offers = () => {
    const offers = [
        {
            id: 1,
            title: "Combo Meal Deal",
            desc: "Burger + Fries + Drink at a special price.",
            img: OfferImg,
        },
        {
            id: 2,
            title: "Family Pack",
            desc: "Perfect meals for the whole family.",
            img: OfferImg,
        },
        {
            id: 3,
            title: "Weekend Special",
            desc: "Get extra crispy fries this weekend only.",
            img: OfferImg,
        },
    ];

    return (
        <section className="bg-[#FFF5E1] px-6 md:px-16 lg:px-24 py-20 relative">
            <h2
                className="text-4xl sm:text-5xl font-extrabold text-[#4B0000] text-center mb-12 drop-shadow-lg"
                style={{ animation: "fadeInUp 1s ease forwards" }}
            >
                Special Offers
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {offers.map((offer, index) => (
                    <div
                        key={offer.id}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition-transform relative"
                        style={{
                            animation: "fadeInUp 1s ease forwards",
                            animationDelay: `${index * 0.2}s`,
                            opacity: 0,
                        }}
                    >
                        <img
                            src={offer.img}
                            alt={offer.title}
                            className="w-full h-48 object-cover rounded-t-3xl"
                            style={{ animation: "float 3s ease-in-out infinite alternate" }}
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-[#4B0000] mb-2">{offer.title}</h3>
                            <p className="text-[#B35F2C] text-sm mb-4">{offer.desc}</p>
                            <button className="px-6 py-2 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition">
                                Order Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Inline animations */}
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

export default Offers;

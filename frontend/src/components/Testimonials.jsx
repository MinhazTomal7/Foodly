import React from "react";
import TestimonialImg from "../assets/burger.png"; // Replace with actual user images

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Alice Johnson",
            role: "Food Lover",
            message:
                "Foodly never disappoints! The burgers are juicy and the fries are always crispy. Highly recommended!",
            img: TestimonialImg,
        },
        {
            id: 2,
            name: "Mark Wilson",
            role: "Regular Customer",
            message:
                "Amazing flavors and fast delivery. I always get my food fresh and hot!",
            img: TestimonialImg,
        },
        {
            id: 3,
            name: "Sophie Lee",
            role: "Happy Customer",
            message:
                "The weekend special deals are my favorite. Great combo meals at affordable prices.",
            img: TestimonialImg,
        },
    ];

    return (
        <section className="bg-[#4B0000] text-white py-20 px-6 md:px-16 lg:px-24 relative">
            <h2
                className="text-4xl sm:text-5xl font-extrabold text-center mb-12 drop-shadow-lg"
                style={{ animation: "fadeInUp 1s ease forwards" }}
            >
                What Our Customers Say
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testi, index) => (
                    <div
                        key={testi.id}
                        className="bg-[#FFF5E1] text-[#4B0000] rounded-3xl p-6 shadow-lg hover:scale-105 transition-transform relative"
                        style={{
                            animation: "fadeInUp 1s ease forwards",
                            animationDelay: `${index * 0.2}s`,
                            opacity: 0,
                        }}
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={testi.img}
                                alt={testi.name}
                                className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="font-bold text-lg">{testi.name}</h3>
                                <p className="text-sm text-[#B35F2C]">{testi.role}</p>
                            </div>
                        </div>
                        <p className="text-sm">{testi.message}</p>
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
        `}
            </style>
        </section>
    );
};

export default Testimonials;

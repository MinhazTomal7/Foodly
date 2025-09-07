import React from "react";
import { Truck, Leaf, DollarSign, ThumbsUp } from "lucide-react";

const WhyChooseUs = () => {
    const features = [
        {
            id: 1,
            title: "Fast Delivery",
            desc: "Hot and fresh food delivered to your doorstep in no time.",
            icon: <Truck className="w-10 h-10 text-[#4B0000]" />,
        },
        {
            id: 2,
            title: "Fresh Ingredients",
            desc: "We use only high-quality and fresh ingredients for every meal.",
            icon: <Leaf className="w-10 h-10 text-[#4B0000]" />,
        },
        {
            id: 3,
            title: "Affordable Prices",
            desc: "Delicious meals that don’t hurt your wallet.",
            icon: <DollarSign className="w-10 h-10 text-[#4B0000]" />,
        },
        {
            id: 4,
            title: "Customer Satisfaction",
            desc: "We craft every dish with love and passion for our customers.",
            icon: <ThumbsUp className="w-10 h-10 text-[#4B0000]" />,
        },
    ];

    return (
        <section className="relative bg-[#FFF5E1] py-20 px-6 md:px-16 lg:px-24">
            {/* ✅ Top curve matches About bottom */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    className="relative block w-full h-20 text-[#FFF5E1]"  // cream
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 320"
                >
                    <path
                        fill="currentColor"
                        d="M0,64L48,74.7C96,85,192,107,288,117.3C384,128,480,128,576,128C672,128,768,128,864,149.3C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192V320H0Z"
                    />
                </svg>
            </div>

            <h2
                className="text-4xl sm:text-5xl font-extrabold text-[#4B0000] text-center mb-16 drop-shadow-lg"
                style={{ animation: "fadeInUp 1s ease forwards" }}
            >
                Why Choose Us
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {features.map((feature, index) => (
                    <div
                        key={feature.id}
                        className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform text-center"
                        style={{
                            animation: "fadeInUp 1s ease forwards",
                            animationDelay: `${index * 0.2}s`,
                            opacity: 0,
                        }}
                    >
                        <div className="flex justify-center mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold text-[#4B0000] mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-[#B35F2C] text-sm">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;

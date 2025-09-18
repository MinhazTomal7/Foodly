// src/components/Hero.jsx
import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import BurgerImg from "../assets/burger.png";

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-[#4B0000] px-6 md:px-16 lg:px-24 py-28 relative overflow-visible">

            {/* Left Side - Text */}
            <div className="md:w-1/2 z-20 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#FFF5E1] leading-tight drop-shadow-lg"
                    style={{ animation: "fadeInUp 1s ease forwards" }}
                >
                    The Taste You’ll Love
                </h1>
                <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-[#FFB89C] max-w-md mx-auto md:mx-0"
                   style={{ animation: "fadeInUp 1s ease 0.2s forwards", opacity: 0 }}
                >
                    Satisfy your cravings with our handcrafted fast food — juicy burgers, crispy fries, and flavors that hit different.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start"
                     style={{ animation: "fadeInUp 1s ease 0.4s forwards", opacity: 0 }}
                >
                    <RouterLink
                        to="/menu"
                        className="px-8 py-3 bg-[#FFB89C] text-[#4B0000] font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Order Now
                    </RouterLink>

                    {/* Smooth scroll to Offers */}
                    <ScrollLink
                        to="offers-section" // this must match the id in Offers.jsx
                        smooth={true}
                        duration={700}
                        className="px-8 py-3 border-2 border-[#FFF5E1] text-[#FFF5E1] font-bold rounded-full hover:bg-[#FFF5E1] hover:text-[#4B0000] transition cursor-pointer"
                    >
                        View Specials
                    </ScrollLink>
                </div>
            </div>

            {/* Right Side - Food Image */}
            <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end relative">
                <div className="relative w-64 sm:w-80 md:w-[450px] lg:w-[500px]">

                    {/* Floating circle behind image */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#FFF5E1]/30 blur-2xl z-0"
                         style={{ animation: "floatSlow 5s ease-in-out infinite alternate" }}
                    ></div>

                    {/* Food Image */}
                    <img
                        src={BurgerImg}
                        alt="Delicious Burger"
                        className="relative z-20 hover:scale-105 transition-transform w-full h-auto"
                        style={{ animation: "float 3s ease-in-out infinite alternate" }}
                    />
                </div>
            </div>

            {/* Wave divider at bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#ffffff" d="M0,224L48,197.3C96,171,192,117,288,106.7C384,96,480,128,576,133.3C672,139,768,117,864,128C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
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
                        50% { transform: translateY(-15px); }
                        100% { transform: translateY(0px); }
                    }

                    @keyframes floatSlow {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }
                `}
            </style>
        </section>
    );
};

export default Hero;

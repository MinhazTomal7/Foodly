import React from "react";
import AboutImg from "../assets/burger.png";

const About = () => {
    return (
        <section id="about" className="relative bg-gradient-to-r from-[#4B0000] to-[#6A1A1A] text-white px-6 md:px-16 lg:px-24 py-28 overflow-hidden">

            {/* Top curve (as before) */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    className="relative block w-full h-24 md:h-32 lg:h-40"
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#ffffff"   // restored
                        d="M0,160L60,149.3C120,139,240,117,360,117.3C480,117,600,139,720,160C840,181,960,203,1080,197.3C1200,192,1320,160,1380,144L1440,128L1440,0L0,0Z"
                    />
                </svg>
            </div>


            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                {/* Left Side - Image */}
                <div className="md:w-1/2 flex justify-center md:justify-start relative">
                    <img
                        src={AboutImg}
                        alt="About Food"
                        className="w-80 sm:w-96 md:w-[420px] rounded-3xl shadow-2xl hover:scale-105 transition-transform"
                        style={{ animation: "float 3s ease-in-out infinite alternate" }}
                    />
                    <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-[#FFF5E1]/20 blur-3xl z-0"></div>
                </div>

                {/* Right Side - Text */}
                <div
                    className="md:w-1/2 text-center md:text-left"
                    style={{ animation: "fadeInUp 1s ease forwards" }}
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#FFF5E1] mb-6 drop-shadow-lg">
                        Who We Are
                    </h2>
                    <p className="text-[#FFB89C] text-lg sm:text-xl mb-6">
                        Foodly isn’t just about meals—it’s about experiences. We blend passion with fresh ingredients to create dishes that feel like comfort and taste like joy.
                    </p>
                    <p className="text-[#FFF5E1] text-lg sm:text-xl">
                        From quick bites to hearty feasts, we’re here to make every meal memorable.
                    </p>
                </div>
            </div>

            {/* ✅ Bottom curve matches WhyChooseUs background */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    className="relative block w-full h-20 text-[#FFF5E1]"  // cream color
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

export default About;

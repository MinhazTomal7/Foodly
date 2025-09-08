import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
        {
            id: 4,
            name: "David Brown",
            role: "Food Blogger",
            message:
                "Tried their family pack last week. It was delicious and worth every penny!",
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

            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                spaceBetween={30}
                loop={true}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {testimonials.map((testi) => (
                    <SwiperSlide key={testi.id}>
                        <div className="bg-[#FFF5E1] text-[#4B0000] rounded-3xl p-6 shadow-lg hover:scale-105 transition-transform">
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;

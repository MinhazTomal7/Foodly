import React from 'react';
import Hero from "../components/Hero.jsx";
import FeaturedMenu from "../components/FeaturedMenu.jsx";
import About from "../components/About.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Offers from "../components/Offers.jsx";
import Testimonials from "../components/Testimonials.jsx";

const Home = () => {
    return (
        <div>
            <Hero/>
            <FeaturedMenu/>
            <About/>
            <WhyChooseUs/>
            <Offers/>
            <Testimonials/>
        </div>
    );
};

export default Home;
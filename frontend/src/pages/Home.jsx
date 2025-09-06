import React from "react";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex flex-col items-center justify-center flex-1 px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-green-600 mb-4">
                    Welcome to Foodly
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl">
                    Discover delicious meals, order online, and enjoy fast delivery.
                </p>
            </main>
        </div>
    );
};

export default Home;

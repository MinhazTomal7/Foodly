import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <h1 className="text-2xl font-bold text-green-600 cursor-pointer">
                                Foodly
                            </h1>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600">
                            Home
                        </Link>
                        <Link to="/menu" className="text-gray-700 dark:text-gray-300 hover:text-green-600">
                            Menu
                        </Link>
                        <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-green-600">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-green-600">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

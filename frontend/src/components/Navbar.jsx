import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = ["Home", "Menu", "Cart", "About", "Contact"];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 px-6 md:px-16 lg:px-24 py-4 flex justify-between items-center font-sans transition-all duration-500 ${
                scrolled ? "bg-[#4B0000]/90 shadow-md" : "bg-transparent"
            }`}
        >
            {/* Logo */}
            <Link to="/" className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#FFF5E1]">
                Foodly.
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-10 text-lg text-[#FFF5E1]">
                {links.map((link) => (
                    <NavLink
                        key={link}
                        to={`/${link.toLowerCase()}`}
                        className={({ isActive }) =>
                            `transition-colors duration-300 ${
                                isActive ? "text-[#FFB89C] font-semibold" : "hover:text-[#FFB89C]"
                            }`
                        }
                    >
                        {link}
                    </NavLink>
                ))}
                <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-[#FFB89C]" />
            </nav>

            {/* Mobile Menu */}
            <button className="md:hidden text-[#FFF5E1]" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-[#4B0000]/90 flex flex-col items-center gap-6 py-6 text-[#FFF5E1] px-6">
                    {links.map((link) => (
                        <Link
                            key={link}
                            to={`/${link.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            className="hover:text-[#FFB89C] transition-colors"
                        >
                            {link}
                        </Link>
                    ))}
                    <ShoppingCart className="w-5 h-5 hover:text-[#FFB89C]" />
                </div>
            )}
        </header>
    );
};

export default Navbar;

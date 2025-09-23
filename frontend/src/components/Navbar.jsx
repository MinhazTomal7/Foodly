"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import useUserStore from "../store/UserStore";
import useCartStore from "../store/cartStore";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { user, logout } = useUserStore();
    const isLoggedIn = !!user;

    const { items, fetchCart } = useCartStore();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isLoggedIn) fetchCart();
    }, [isLoggedIn, fetchCart]);

    const handleNavigateOrScroll = (id) => {
        if (location.pathname === "/") {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate("/", { state: { scrollToId: id } });
        }
    };

    const handleMobileNavigate = (callback) => {
        callback();       // navigate or scroll
        setIsOpen(false); // close mobile menu
    };

    const handleLogout = () => {
        logout();
        navigate("/");
        window.location.reload();
    };

    const navbarBg =
        location.pathname !== "/" || scrolled
            ? "bg-[#4B0000]/90 shadow-md"
            : "bg-transparent";

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 px-6 md:px-16 lg:px-24 py-4 flex justify-between items-center font-sans transition-all duration-500 ${navbarBg}`}
        >
            {/* Logo */}
            <div
                className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#FFF5E1] cursor-pointer"
                onClick={() => handleNavigateOrScroll("home")}
            >
                Foodly.
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 md:gap-10 text-lg text-[#FFF5E1] items-center relative">
                <button onClick={() => handleNavigateOrScroll("home")} className="hover:text-[#FFB89C] transition">Home</button>
                <button onClick={() => navigate("/menu")} className="hover:text-[#FFB89C] transition">Menu</button>
                <button onClick={() => handleNavigateOrScroll("footer")} className="hover:text-[#FFB89C] transition">Contact</button>
                <button onClick={() => navigate("/orders")} className="hover:text-[#FFB89C] transition">My Orders</button>

                {/* Cart Icon */}
                <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                    <ShoppingCart className="w-6 h-6 hover:text-[#FFB89C]" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                            {cartCount}
                        </span>
                    )}
                </div>

                {/* Login/Profile */}
                {!isLoggedIn ? (
                    <>
                        <button onClick={() => navigate("/login")} className="px-4 py-1 bg-[#FFB89C] text-[#4B0000] font-bold rounded-full hover:bg-[#E6A974] transition">
                            Login
                        </button>
                        <button onClick={() => navigate("/signup")} className="px-4 py-1 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition">
                            Signup
                        </button>
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate("/profile")} className="flex items-center gap-1 px-4 py-1 bg-[#FFB89C] text-[#4B0000] font-bold rounded-full hover:bg-[#E6A974] transition">
                            <User className="w-4 h-4" /> Profile
                        </button>
                        <button onClick={handleLogout} className="px-4 py-1 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition">
                            Logout
                        </button>
                    </div>
                )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-[#FFF5E1]" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-[#4B0000]/90 flex flex-col items-center gap-6 py-6 text-[#FFF5E1] px-6">
                    <button onClick={() => handleMobileNavigate(() => handleNavigateOrScroll("home"))} className="hover:text-[#FFB89C] transition">Home</button>
                    <button onClick={() => handleMobileNavigate(() => navigate("/menu"))} className="hover:text-[#FFB89C] transition">Menu</button>
                    <button onClick={() => handleMobileNavigate(() => handleNavigateOrScroll("footer"))} className="hover:text-[#FFB89C] transition">Contact</button>
                    <button onClick={() => handleMobileNavigate(() => navigate("/orders"))} className="hover:text-[#FFB89C] transition">My Orders</button>

                    {/* Mobile Cart */}
                    <div className="relative cursor-pointer" onClick={() => handleMobileNavigate(() => navigate("/cart"))}>
                        <ShoppingCart className="w-5 h-5 hover:text-[#FFB89C]" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                                {cartCount}
                            </span>
                        )}
                    </div>

                    {/* Mobile Login/Profile */}
                    {!isLoggedIn ? (
                        <>
                            <button onClick={() => handleMobileNavigate(() => navigate("/login"))} className="px-4 py-1 bg-[#FFB89C] text-[#4B0000] font-bold rounded-full hover:bg-[#E6A974] transition">
                                Login
                            </button>
                            <button onClick={() => handleMobileNavigate(() => navigate("/signup"))} className="px-4 py-1 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition">
                                Signup
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2 items-center">
                            <button onClick={() => handleMobileNavigate(() => navigate("/profile"))} className="flex items-center gap-1 px-4 py-1 bg-[#FFB89C] text-[#4B0000] font-bold rounded-full hover:bg-[#E6A974] transition">
                                <User className="w-4 h-4" /> Profile
                            </button>
                            <button onClick={() => handleMobileNavigate(handleLogout)} className="px-4 py-1 bg-[#4B0000] text-white font-bold rounded-full hover:bg-[#550000] transition">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default Navbar;

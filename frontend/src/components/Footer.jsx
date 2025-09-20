import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer id="footer" className="bg-[#4B0000] text-white py-12 px-6 md:px-16 lg:px-24 w-full mt-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">

                {/* Brand & Description */}
                <div className="md:w-1/3">
                    <h1 className="text-3xl font-extrabold mb-4">Foodly</h1>
                    <p className="text-[#FFB89C] text-sm">
                        Delicious meals delivered fresh to your doorstep. Taste the love in every bite!
                    </p>
                    {/* Admin Login Link */}
                    <Link
                        to="/admin/login"
                        className="mt-4 inline-flex items-center gap-1 text-sm text-[#FFB89C] hover:text-white transition"
                    >
                        <Lock className="w-4 h-4" /> Admin Login
                    </Link>
                </div>

                {/* Contact Info */}
                <div className="md:w-1/3">
                    <h2 className="font-bold mb-4 text-lg">Contact Us</h2>
                    <ul className="space-y-2 text-[#FFB89C]">
                        <li className="flex items-center gap-2"><MapPin className="w-5 h-5" /> 123 Food Street, Dhaka, Bangladesh</li>
                        <li className="flex items-center gap-2"><Phone className="w-5 h-5" /> +880 1234 567890</li>
                        <li className="flex items-center gap-2"><Mail className="w-5 h-5" /> info@foodly.com</li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="md:w-1/3 text-center md:text-right">
                    <h2 className="font-bold mb-4 text-lg">Follow Us</h2>
                    <div className="flex justify-center md:justify-end gap-4">
                        <a href="#"><Facebook className="w-6 h-6 hover:text-[#FFB89C] transition" /></a>
                        <a href="#"><Instagram className="w-6 h-6 hover:text-[#FFB89C] transition" /></a>
                        <a href="#"><Twitter className="w-6 h-6 hover:text-[#FFB89C] transition" /></a>
                    </div>
                </div>

            </div>

            {/* Divider */}
            <div className="border-t border-[#FFB89C]/50 mt-8"></div>

            {/* Copyright */}
            <p className="text-center text-sm text-[#FFB89C] mt-4">&copy; {new Date().getFullYear()} Foodly. All rights reserved.</p>
        </footer>
    );
};

export default Footer;

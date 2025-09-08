import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/UserStore"; // your Zustand store

const Signup = () => {
    const navigate = useNavigate();
    const { sendSignupOTP, loading, error } = useUserStore();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await sendSignupOTP(form.name, form.email, form.password);
        if (!res.error) {
            navigate("/verify-otp", { state: { email: form.email } }); // pass email to OTP page
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5E1] px-4">
            <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-[#4B0000] text-center mb-6">
                    Sign Up
                </h2>

                {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0000]"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0000]"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0000]"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#4B0000] text-white font-bold py-2 rounded-xl hover:bg-[#550000] transition disabled:opacity-50"
                    >
                        {loading ? "Sending OTP..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

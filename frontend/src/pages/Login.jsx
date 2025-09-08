import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        alert("Login successful (demo).");
        navigate("/profile");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5E1] px-4">
            <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-[#4B0000] text-center mb-6">
                    Login
                </h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                        className="bg-[#4B0000] text-white font-bold py-2 rounded-xl hover:bg-[#550000] transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <span
                        className="text-[#FFB89C] cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;

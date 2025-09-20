import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded credentials
        if (username === "admin" && password === "12345") {
            localStorage.setItem("adminLoggedIn", "true");
            navigate("/admin/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#FFF5E1] px-6">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-[#4B0000] mb-6 text-center">
                    Admin Login
                </h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B0000]"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B0000]"
                    />
                    {error && (
                        <p className="text-red-600 font-semibold">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-[#4B0000] text-white font-bold rounded-lg hover:bg-[#550000] transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUserStore from "../store/UserStore";

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};
    const { verifyUserOTP, loading, error } = useUserStore();
    const [otp, setOtp] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();
        const res = await verifyUserOTP(email, otp);
        if (!res.error) {
            navigate("/profile"); // 🔥 auto-login, go to profile
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5E1] px-4">
            <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-[#4B0000] text-center mb-6">
                    Verify OTP
                </h2>

                <p className="text-center text-[#B35F2C] mb-4">
                    Enter the 6-digit OTP sent to {email || "your email"}
                </p>

                {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                <form onSubmit={handleVerify} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0000]"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#4B0000] text-white font-bold py-2 rounded-xl hover:bg-[#550000] transition disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTP;

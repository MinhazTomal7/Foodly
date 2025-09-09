import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProfileStore from "../store/ProfileStore";
import useUserStore from "../store/UserStore";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
    const navigate = useNavigate();
    const { user, loadUserFromStorage } = useUserStore();
    const { profile, fetchProfile, updateProfile, loading, error } =
        useProfileStore();

    const [localProfile, setLocalProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    // Load user from storage on mount
    useEffect(() => {
        if (!user) loadUserFromStorage();
    }, [user, loadUserFromStorage]);

    // Fetch profile if token exists
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/login");
            return;
        }
        fetchProfile();
    }, [fetchProfile, navigate]);

    // Sync Zustand profile → local state
    useEffect(() => {
        if (profile) setLocalProfile(profile);
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!localProfile.phone || !localProfile.address) {
            toast.error("Please fill in all required fields.");
            return;
        }
        const res = await updateProfile(localProfile);
        if (res.success) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error("Error: " + res.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5E1] px-4">
            {/* Toast container */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md border border-[#B35F2C]/30">
                <h2 className="text-3xl font-extrabold text-[#4B0000] text-center mb-6">
                    Your Profile
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                        <label className="block text-[#B35F2C] font-semibold mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={localProfile.name || ""}
                            onChange={handleChange}
                            className="w-full border border-[#B35F2C]/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4B0000] outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-[#B35F2C] font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={localProfile.email || ""}
                            disabled
                            className="w-full border border-[#B35F2C]/40 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-[#B35F2C] font-semibold mb-1">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={localProfile.phone || ""}
                            onChange={handleChange}
                            className="w-full border border-[#B35F2C]/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4B0000] outline-none"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-[#B35F2C] font-semibold mb-1">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={localProfile.address || ""}
                            onChange={handleChange}
                            className="w-full border border-[#B35F2C]/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4B0000] outline-none"
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="mt-6 bg-[#4B0000] text-white font-bold py-3 rounded-xl hover:bg-[#550000] transition"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Update Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

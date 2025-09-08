import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userData, saveProfile }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(userData || {
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Check if profile is complete
        if (user.name && user.email && user.phone && user.address) {
            setIsComplete(true);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!user.phone || !user.address) {
            alert("Please fill in all required fields.");
            return;
        }
        saveProfile(user); // function to save profile to backend
        setIsComplete(true);
        alert("Profile saved successfully!");
    };

    const handleLogout = () => {
        alert("Logged out (demo).");
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5E1] px-4">
            <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-[#4B0000] text-center mb-6">
                    {isComplete ? "Your Profile" : "Complete Your Profile"}
                </h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-[#B35F2C] font-semibold">Name</p>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    <div>
                        <p className="text-[#B35F2C] font-semibold">Email</p>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    <div>
                        <p className="text-[#B35F2C] font-semibold">Phone</p>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    <div>
                        <p className="text-[#B35F2C] font-semibold">Address</p>
                        <textarea
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    <button
                        onClick={isComplete ? handleLogout : handleSave}
                        className={`mt-6 bg-[#4B0000] text-white font-bold py-2 rounded-xl hover:bg-[#550000] transition`}
                    >
                        {isComplete ? "Logout" : "Save Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

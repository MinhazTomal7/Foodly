import { Link } from "react-router-dom";

const Navbar = () => {
    const user = null; // replace with your user store later

    return (
        <nav className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-tight hover:text-yellow-300 transition"
                >
                    Foodly
                </Link>

                {/* Menu Links */}
                <div className="flex items-center space-x-6">
                    <Link
                        to="/menu"
                        className="hover:text-yellow-200 transition font-semibold"
                    >
                        Menu
                    </Link>
                    <Link
                        to="/cart"
                        className="hover:text-yellow-200 transition font-semibold"
                    >
                        Cart
                    </Link>

                    {/* User Section */}
                    {user ? (
                        <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-white text-green-700 rounded-full font-medium shadow">
                {user.name}
              </span>
                            <button className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full shadow transition">
                                Logout
                            </button>
                            {user.role === "admin" && (
                                <Link
                                    to="/admin/dashboard"
                                    className="ml-2 px-3 py-1 bg-yellow-400 text-green-800 rounded-full font-semibold hover:bg-yellow-500 transition"
                                >
                                    Admin
                                </Link>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="px-3 py-1 bg-white text-green-700 rounded-full font-medium hover:bg-gray-100 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

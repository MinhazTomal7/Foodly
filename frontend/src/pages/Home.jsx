import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            {/* Hero Text */}
            <h1 className="text-5xl font-bold text-green-600 mb-6 text-center">
                Welcome to Foodly!
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
                Order delicious food from your favorite restaurants and get it
                delivered to your doorstep quickly and safely.
            </p>

            {/* Buttons */}
            <div className="flex space-x-4">
                <Link
                    to="/menu"
                    className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition font-semibold"
                >
                    View Menu
                </Link>
                <Link
                    to="/cart"
                    className="bg-gray-800 text-white px-8 py-3 rounded-lg shadow hover:bg-gray-900 transition font-semibold"
                >
                    Your Cart
                </Link>
            </div>

            {/* Optional Image or Illustration */}
            <div className="mt-10">
                <img
                    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
                    alt="Delicious food"
                    className="rounded-xl shadow-lg max-w-full h-96 object-cover"
                />
            </div>
        </div>
    );
};

export default Home;

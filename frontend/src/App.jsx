import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "./store/UserStore";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFail from "./pages/PaymentFail.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => window.scrollTo(0, 0), [pathname]);
    return null;
};

// ✅ Protect Admin Routes
const AdminRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
};

function App() {
    const loadUserFromStorage = useUserStore((state) => state.loadUserFromStorage);

    useEffect(() => {
        loadUserFromStorage();
    }, [loadUserFromStorage]);

    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Navbar />}
            <ScrollToTop />
            <main className="flex-grow">
                <Routes>
                    {/* User Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/verify-otp" element={<VerifyOTP />} />
                    <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
                    <Route path="/PaymentFail" element={<PaymentFail />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />
                </Routes>
            </main>
            {!isAdminRoute && <Footer />}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

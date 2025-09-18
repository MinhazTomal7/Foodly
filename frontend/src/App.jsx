import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "./store/UserStore";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFail from "./pages/PaymentFail.jsx";

// ✅ ScrollToTop component
import { useLocation } from "react-router-dom";
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

function App() {
    const loadUserFromStorage = useUserStore((state) => state.loadUserFromStorage);

    useEffect(() => {
        loadUserFromStorage();
    }, [loadUserFromStorage]);

    return (
        <div className="flex flex-col min-h-screen">
            <BrowserRouter>
                <Navbar />
                <ScrollToTop /> {/* 👈 added here */}
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/verify-otp" element={<VerifyOTP />} />
                        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
                        <Route path="/PaymentFail" element={<PaymentFail />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;

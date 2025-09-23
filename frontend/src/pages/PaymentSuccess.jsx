import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <h1 className="text-4xl font-bold text-green-800 mb-6">Payment Successful!</h1>
            <p className="mb-4 text-green-700">
                Thank you for your order. You can check the details in your Orders page.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-green-800 text-white font-bold rounded-lg hover:bg-green-700 transition"
                >
                    Go Home
                </button>
                <button
                    onClick={() => navigate("/menu")}
                    className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition"
                >
                    Go to Menu
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;

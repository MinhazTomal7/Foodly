import { useNavigate } from "react-router-dom";

const PaymentFail = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
            <h1 className="text-4xl font-bold text-red-800 mb-6">Payment Failed</h1>
            <p className="mb-6 text-red-700">Something went wrong with your payment.</p>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-red-800 text-white font-bold rounded-lg hover:bg-red-700 transition"
                >
                    Go Home
                </button>
                <button
                    onClick={() => navigate("/menu")}
                    className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition"
                >
                    Go to Menu
                </button>
            </div>
        </div>
    );
};

export default PaymentFail;

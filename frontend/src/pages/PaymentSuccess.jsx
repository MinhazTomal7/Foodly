import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tran_id = searchParams.get("tran_id");
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (tran_id) {
            axios
                .get(`http://localhost:5050/api/order/${tran_id}`)
                .then(res => setOrder(res.data.order))
                .catch(err => console.error(err));
        }
    }, [tran_id]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <h1 className="text-4xl font-bold text-green-800 mb-6">Payment Successful!</h1>
            {order && <p className="mb-4">Order ID: {order._id}</p>}
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

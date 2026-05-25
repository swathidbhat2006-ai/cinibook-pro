import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const BACKEND_URL = "https://cinibook-pro.onrender.com";

function Payment() {
  const navigate = useNavigate();
  const locationData = useLocation();
  const { movie, theatre, timing, seats, total } = locationData.state;

  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [snacks, setSnacks] = useState({
    popcorn: false,
    coke: false,
    nachos: false,
  });

  const snackTotal =
    (snacks.popcorn ? 250 : 0) +
    (snacks.coke ? 120 : 0) +
    (snacks.nachos ? 180 : 0);

  const finalTotal = total + snackTotal;

  const handlePayment = async () => {
    if (!method) {
      alert("Please select payment method 💳");
      return;
    }
    if (seats.length === 0) {
      alert("No seats selected!");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/bookings`, {
        movie: movie.title,
        theatre,
        timing,
        seats,
        total: finalTotal,
        email: localStorage.getItem("userEmail"),
      });

      alert(`Payment Successful via ${method} 🎉`);
      navigate("/ticket", {
        state: { movie, theatre, timing, seats, total: finalTotal },
      });
    } catch (error) {
      console.log(error);
      alert("Booking Failed 😭 — Backend may be sleeping. Wait 1 min and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center px-5 py-10">
      <div className="bg-[#1a1a1a] p-10 rounded-3xl w-full max-w-xl">
        <h1 className="text-5xl font-bold mb-10 text-center">Payment 💳</h1>

        {/* Booking Info */}
        <div className="bg-[#111] p-6 rounded-2xl mb-8">
          <h2 className="text-3xl font-bold mb-3">{movie.title}</h2>
          <p className="text-gray-400 mb-2">🎬 {theatre}</p>
          <p className="text-gray-400 mb-2">⏰ {timing}</p>
          <p className="text-gray-400 mb-5">💺 Seats: {seats.join(", ")}</p>
          <h2 className="text-5xl font-bold text-green-500">₹{finalTotal}</h2>
        </div>

        {/* Snacks */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-5">Add Snacks 🍿</h2>
          <div className="space-y-4">
            {[
              { key: "popcorn", label: "🍿 Popcorn", price: 250 },
              { key: "coke", label: "🥤 Coke", price: 120 },
              { key: "nachos", label: "🍕 Nachos", price: 180 },
            ].map((item) => (
              <div
                key={item.key}
                onClick={() =>
                  setSnacks({ ...snacks, [item.key]: !snacks[item.key] })
                }
                className={`p-5 rounded-xl cursor-pointer transition border ${
                  snacks[item.key]
                    ? "bg-red-600 border-red-600"
                    : "bg-[#222] border-gray-700"
                }`}
              >
                {item.label} — ₹{item.price}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-5 mb-10">
          {[
            { id: "Credit / Debit Card", label: "💳 Credit / Debit Card" },
            { id: "UPI Payment", label: "📱 UPI Payment" },
            { id: "Net Banking", label: "🏦 Net Banking" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`w-full py-4 rounded-xl text-left px-5 transition ${
                method === m.id ? "bg-red-600" : "bg-[#222] hover:bg-[#333]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-400">Selected Method</p>
          <h3 className="text-2xl text-red-500 font-bold mt-2">
            {method || "None"}
          </h3>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-5 rounded-2xl text-xl font-bold transition ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Processing... Please wait ⏳" : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default Payment;

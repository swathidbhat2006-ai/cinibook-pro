import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const BACKEND = "https://cinibook-pro.onrender.com";

function Payment() {
  const navigate = useNavigate();
  const locationData = useLocation();

  const { movie, theatre, timing, seats, total } = locationData.state;

  const [method, setMethod] = useState("");

  /* ✅ FIX 4: Loading state prevents double-clicks and shows feedback */
  const [paying, setPaying] = useState(false);

  /* Snacks */
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

  /* ✅ FIX 4: Proper payment handler with timeout for Render cold start */
  const handlePayment = async () => {
    if (!method) {
      alert("Please select a payment method 💳");
      return;
    }

    setPaying(true);

    try {
      await axios.post(
        `${BACKEND}/bookings`,
        {
          movie: movie.title,
          theatre,
          timing,
          seats,
          total: finalTotal,
          email: localStorage.getItem("userEmail"),
        },
        {
          timeout: 60000, // 30 second timeout — handles Render cold start
        }
      );

      alert(`Payment Successful via ${method} 🎉`);

      navigate("/ticket", {
        state: { movie, theatre, timing, seats, total: finalTotal },
      });

    } catch (error) {
      console.log(error);

      if (error.code === "ECONNABORTED") {
        alert("Server took too long to respond. Please try again in a moment! ⏳");
      } else if (error.response) {
        alert(`Booking Failed: ${error.response.data?.error || "Server error"} 😭`);
      } else {
        alert("Could not connect to server. Check your internet and try again! 😭");
      }
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center px-5 py-10">
      <div className="bg-[#1a1a1a] p-10 rounded-3xl w-full max-w-xl">

        {/* Heading */}
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

            <div
              onClick={() => setSnacks({ ...snacks, popcorn: !snacks.popcorn })}
              className={`p-5 rounded-xl cursor-pointer transition border ${
                snacks.popcorn ? "bg-red-600 border-red-600" : "bg-[#222] border-gray-700"
              }`}
            >
              🍿 Popcorn — ₹250
            </div>

            <div
              onClick={() => setSnacks({ ...snacks, coke: !snacks.coke })}
              className={`p-5 rounded-xl cursor-pointer transition border ${
                snacks.coke ? "bg-red-600 border-red-600" : "bg-[#222] border-gray-700"
              }`}
            >
              🥤 Coke — ₹120
            </div>

            <div
              onClick={() => setSnacks({ ...snacks, nachos: !snacks.nachos })}
              className={`p-5 rounded-xl cursor-pointer transition border ${
                snacks.nachos ? "bg-red-600 border-red-600" : "bg-[#222] border-gray-700"
              }`}
            >
              🍕 Nachos — ₹180
            </div>

          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-5 mb-10">
          {["Credit / Debit Card", "UPI Payment", "Net Banking"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`w-full py-4 rounded-xl text-left px-5 transition ${
                method === m ? "bg-red-600" : "bg-[#222] hover:bg-[#333]"
              }`}
            >
              {m === "Credit / Debit Card" && "💳 "}
              {m === "UPI Payment" && "📱 "}
              {m === "Net Banking" && "🏦 "}
              {m}
            </button>
          ))}
        </div>

        {/* Selected Method */}
        <div className="text-center mb-8">
          <p className="text-gray-400">Selected Method</p>
          <h3 className="text-2xl text-red-500 font-bold mt-2">
            {method || "None"}
          </h3>
        </div>

        {/* ✅ FIX 4: Pay Button — disabled + shows loading while processing */}
        <button
          onClick={handlePayment}
          disabled={paying}
          className={`w-full py-5 rounded-2xl text-xl font-bold transition ${
            paying
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {paying ? "Processing... ⏳" : "Pay Now"}
        </button>

      </div>
    </div>
  );
}

export default Payment;

import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://cinibook-pro.onrender.com/"; // ← same backend URL

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const url = email ? `${API}/bookings?email=${encodeURIComponent(email)}` : `${API}/bookings`;
      const response = await axios.get(url);
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await axios.delete(`${API}/bookings/${id}`);
      fetchBookings();
      alert("Booking Cancelled 🔥");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen px-10 py-10">
      <h1 className="text-5xl font-bold mb-10">My Bookings 🎟</h1>

      {loading ? (
        <p className="text-2xl text-gray-400">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-2xl text-gray-400">No bookings yet 😭</p>
      ) : (
        <div className="space-y-8">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-[#1a1a1a] p-8 rounded-3xl">
              <h2 className="text-3xl font-bold mb-3">{booking.movie}</h2>
              <p className="text-gray-400 mb-2">🎬 {booking.theatre}</p>
              <p className="text-gray-400 mb-2">🕐 {booking.timing}</p>
              <p className="text-gray-400 mb-2">💺 Seats: {booking.seats.join(", ")}</p>
              <p className="text-green-500 text-2xl font-bold mt-4">₹{booking.total}</p>
              <p className="text-red-500 mt-3">Booking ID: {booking._id}</p>
              <button
                onClick={() => deleteBooking(booking._id)}
                className="mt-5 bg-red-600 px-6 py-3 rounded-xl hover:bg-red-700 transition"
              >
                Cancel Booking ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;
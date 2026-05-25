import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND = "https://cinibook-pro.onrender.com";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ✅ FIX 2: Fetch only THIS user's bookings using email filter */
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND}/bookings`, {
        params: { email: userEmail },
      });
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ✅ FIX 1: Cancel booking — fixed template literal (was using quotes before!) */
  const deleteBooking = async (id) => {
    const confirm = window.confirm("Cancel this booking?");
    if (!confirm) return;

    try {
      await axios.delete(`${BACKEND}/bookings/${id}`);
      fetchBookings();
      alert("Booking Cancelled 😭🔥");
    } catch (error) {
      console.log(error);
      alert("Failed to cancel. Try again!");
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-400">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-10 py-10">

      {/* Heading */}
      <h1 className="text-5xl font-bold mb-10">My Bookings 🎟</h1>

      {/* Empty */}
      {bookings.length === 0 ? (
        <p className="text-2xl text-gray-400">No bookings yet 😭</p>
      ) : (
        <div className="space-y-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-[#1a1a1a] p-8 rounded-3xl"
            >
              {/* Movie */}
              <h2 className="text-3xl font-bold mb-3">{booking.movie}</h2>

              {/* Theatre */}
              <p className="text-gray-400 mb-2">🎬 {booking.theatre}</p>

              {/* Timing */}
              <p className="text-gray-400 mb-2">⏰ {booking.timing}</p>

              {/* Seats */}
              <p className="text-gray-400 mb-2">
                💺 Seats: {booking.seats.join(", ")}
              </p>

              {/* Total */}
              <p className="text-green-500 text-2xl font-bold mt-4">
                ₹{booking.total}
              </p>

              {/* Booking ID */}
              <p className="text-red-500 mt-3 text-sm">
                Booking ID: {booking._id}
              </p>

              {/* Cancel Button */}
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

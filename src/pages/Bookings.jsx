import { useEffect, useState }
  from "react";

import axios from "axios";

function Bookings() {

  const [bookings,
    setBookings] =
    useState([]);

  /* Fetch Bookings */
  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings =
    async () => {

      try {

        const response =
          await axios.get(
"https://cinibook-pro.onrender.com/bookings"          );

        setBookings(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  /* Delete Booking */
  const deleteBooking =
    async (id) => {

      try {

        await axios.delete(
"https://cinibook-pro.onrender.com/bookings/${booking._id}"    );

        fetchBookings();

        alert(
          "Booking Cancelled 😭🔥"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <div className="bg-black text-white min-h-screen px-10 py-10">

      {/* Heading */}
      <h1 className="text-5xl font-bold mb-10">
        My Bookings 🎟
      </h1>

      {/* Empty */}
      {bookings.length === 0 ? (

        <p className="text-2xl text-gray-400">
          No bookings yet 😭
        </p>

      ) : (

        <div className="space-y-8">

          {bookings.map(
            (booking, index) => (

              <div
                key={index}
                className="bg-[#1a1a1a] p-8 rounded-3xl"
              >

                {/* Movie */}
                <h2 className="text-3xl font-bold mb-3">
                  {booking.movie}
                </h2>

                {/* Theatre */}
                <p className="text-gray-400 mb-2">
                  🎬 {booking.theatre}
                </p>

                {/* Timing */}
                <p className="text-gray-400 mb-2">
                  ⏰ {booking.timing}
                </p>

                {/* Seats */}
                <p className="text-gray-400 mb-2">
                  💺 Seats:
                  {" "}
                  {booking.seats.join(", ")}
                </p>

                {/* Total */}
                <p className="text-green-500 text-2xl font-bold mt-4">
                  ₹{booking.total}
                </p>

                {/* MongoDB ID */}
                <p className="text-red-500 mt-3">
                  Booking ID:
                  {" "}
                  {booking._id}
                </p>

                {/* Cancel Button */}
                <button
                  onClick={() =>
                    deleteBooking(
                      booking._id
                    )
                  }
                  className="mt-5 bg-red-600 px-6 py-3 rounded-xl hover:bg-red-700 transition"
                >
                  Cancel Booking ❌
                </button>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}

export default Bookings;
import { QRCodeCanvas }
  from "qrcode.react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function Ticket() {

  const navigate = useNavigate();

  const location = useLocation();

  const data = location.state;

  /* No Data */
  if (!data) {

    return (
      <div className="bg-black text-white min-h-screen flex justify-center items-center text-4xl">
        No Ticket Data Found 😭
      </div>
    );
  }

  const {
    movie,
    theatre,
    timing,
    seats,
    total,
  } = data;

  /* Booking ID */
  const bookingId =
    "BMS" +
    Math.floor(
      Math.random() * 999999
    );

  /* Save Booking */
  const bookingData = {
    movie: movie.title,
    theatre,
    timing,
    seats,
    total,
    bookingId,
  };

  const existingBookings =
    JSON.parse(
      localStorage.getItem("bookings")
    ) || [];

  existingBookings.push(
    bookingData
  );

  localStorage.setItem(
    "bookings",
    JSON.stringify(
      existingBookings
    )
  );

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center px-5 py-10">

      <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl">

        {/* Top */}
        <div className="bg-red-600 p-8 text-center">

          <h1 className="text-5xl font-bold mb-3">
            Booking Confirmed 🎉
          </h1>

          <p className="text-xl">
            Enjoy your movie experience
          </p>

        </div>

        {/* Body */}
        <div className="p-10">

          {/* Movie + QR */}
          <div className="flex justify-between items-center mb-10">

            {/* Movie Info */}
            <div>

              <h2 className="text-4xl font-bold mb-3">
                {movie.title}
              </h2>

              <p className="text-gray-400 text-lg">
                {theatre}
              </p>

            </div>

            {/* Real QR */}
            <div className="bg-white p-4 rounded-xl">

              <QRCodeCanvas
                value={`
Movie: ${movie.title}
Theatre: ${theatre}
Seats: ${seats.join(", ")}
Timing: ${timing}
Booking ID: ${bookingId}
                `}
                size={120}
              />

            </div>

          </div>

          {/* Ticket Details */}
          <div className="grid grid-cols-2 gap-8 mb-10">

            {/* Timing */}
            <div>

              <p className="text-gray-400 mb-1">
                Timing
              </p>

              <h3 className="text-2xl font-bold">
                {timing}
              </h3>

            </div>

            {/* Seats */}
            <div>

              <p className="text-gray-400 mb-1">
                Seats
              </p>

              <h3 className="text-2xl font-bold">
                {seats.join(", ")}
              </h3>

            </div>

            {/* Total */}
            <div>

              <p className="text-gray-400 mb-1">
                Total Paid
              </p>

              <h3 className="text-2xl font-bold text-green-500">
                ₹{total}
              </h3>

            </div>

            {/* Booking ID */}
            <div>

              <p className="text-gray-400 mb-1">
                Booking ID
              </p>

              <h3 className="text-2xl font-bold text-red-500">
                {bookingId}
              </h3>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-5">

            {/* Download */}
            <button
              onClick={() =>
                window.print()
              }
              className="flex-1 bg-gray-700 py-4 rounded-xl hover:bg-gray-600 transition"
            >
              Download Ticket
            </button>

            {/* Home */}
            <button
              onClick={() =>
                navigate("/")
              }
              className="flex-1 bg-red-600 py-4 rounded-xl hover:bg-red-700 transition"
            >
              Back Home
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Ticket;
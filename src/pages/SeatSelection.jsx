import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function SeatSelection() {

  const navigate = useNavigate();

  const locationData = useLocation();

  const {
    movie,
    theatre,
    timing,
  } = locationData.state;

  const [selectedSeats, setSelectedSeats] =
    useState([]);

const [bookedSeats,
  setBookedSeats] =
  useState([]);

useEffect(() => {

  fetchBookings();

}, []);

const fetchBookings =
  async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/bookings"
        );

      const bookings =
        response.data;

      let seats = [];

      bookings.forEach(
        (booking) => {

          seats = [
            ...seats,
            ...booking.seats,
          ];

        }
      );

      const filteredBookings =
  bookings.filter(
    (booking) =>
      booking.movie === movie.title &&
      booking.timing === timing
  );

let seats = [];

filteredBookings.forEach(
  (booking) => {

    seats = [
      ...seats,
      ...booking.seats,
    ];

  }
);

setBookedSeats(seats);

    } catch (error) {

      console.log(error);

    }

  };
  const toggleSeat = (seat) => {

    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {

      setSelectedSeats(
        selectedSeats.filter((s) => s !== seat)
      );

    } else {

      setSelectedSeats([
        ...selectedSeats,
        seat,
      ]);

    }
  };

  return (
    <div className="bg-black text-white min-h-screen px-10 py-10">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-700 px-5 py-3 rounded-lg mb-10 hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      {/* Movie Details */}
      <div className="text-center mb-10">

        <h1 className="text-5xl font-bold mb-4">
          {movie.title}
        </h1>

        <p className="text-gray-400 text-xl">
          {theatre} • {timing}
        </p>

      </div>

      {/* Screen */}
      <div className="bg-gray-300 text-black text-center py-3 rounded-lg mb-12 w-[400px] mx-auto font-bold">
        SCREEN
      </div>

      {/* Seats */}
      <div className="grid grid-cols-8 gap-4 justify-center w-fit mx-auto">

        {[...Array(48)].map((_, index) => {

          const seat = index + 1;

          const isBooked =
            bookedSeats.includes(seat);

          const isSelected =
            selectedSeats.includes(seat);

          return (
            <div
              key={seat}
              onClick={() => toggleSeat(seat)}
              className={`w-12 h-12 rounded-lg flex justify-center items-center cursor-pointer font-bold transition

              ${
                isBooked
                  ? "bg-gray-900 cursor-not-allowed"
                  : isSelected
                  ? "bg-red-600"
                  : "bg-gray-700 hover:bg-red-500"
              }
              
              `}
            >
              {seat}
            </div>
          );
        })}

      </div>

      {/* Legends */}
      <div className="flex justify-center gap-10 mt-10">

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-700 rounded"></div>
          <p>Available</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-600 rounded"></div>
          <p>Selected</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-900 rounded"></div>
          <p>Booked</p>
        </div>

      </div>

      {/* Summary */}
      <div className="max-w-xl mx-auto mt-14 bg-[#1a1a1a] p-8 rounded-2xl">

        <h2 className="text-3xl font-bold mb-5">
          Booking Summary
        </h2>

        <p className="mb-3">
          🎬 Movie:
          <span className="text-red-500 ml-2">
            {movie.title}
          </span>
        </p>

        <p className="mb-3">
          🏢 Theatre:
          <span className="text-red-500 ml-2">
            {theatre}
          </span>
        </p>

        <p className="mb-3">
          ⏰ Timing:
          <span className="text-red-500 ml-2">
            {timing}
          </span>
        </p>

        <p className="mb-3">
          💺 Seats:
          <span className="text-red-500 ml-2">
            {selectedSeats.length > 0
              ? selectedSeats.join(", ")
              : "None"}
          </span>
        </p>

        <p className="mb-5">
          💰 Total:
          <span className="text-green-500 ml-2">
            ₹{selectedSeats.length * 250}
          </span>
        </p>

        {/* Continue */}
        <button
          onClick={() =>
            navigate("/payment", {
              state: {
                movie,
                theatre,
                timing,
                seats: selectedSeats,
                total:
                  selectedSeats.length * 250,
              },
            })
          }
          className="w-full bg-red-600 py-4 rounded-xl hover:bg-red-700 transition"
        >
          Continue To Payment
        </button>

      </div>

    </div>
  );
}

export default SeatSelection;
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND = "https://cinibook-pro.onrender.com";

// Generate seat grid: rows A-J, seats 1-10
const ALL_SEATS = [];
const ROWS = ["A","B","C","D","E","F","G","H","I","J"];
for (const row of ROWS) {
  for (let i = 1; i <= 10; i++) {
    ALL_SEATS.push(`${row}${i}`);
  }
}

function SeatSelection() {
  const navigate = useNavigate();
  const locationData = useLocation();

  const { movie, theatre, timing, ticketPrice } = locationData.state;

  const [selectedSeats, setSelectedSeats] = useState([]);

  /* ✅ FIX 3: bookedSeats filtered by movie + theatre + timing — NOT all movies */
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(true);

  useEffect(() => {
    fetchBookedSeats();
  }, []);

  const fetchBookedSeats = async () => {
    try {
      setLoadingSeats(true);
      const res = await axios.get(`${BACKEND}/booked-seats`, {
        params: {
          movie: movie.title,
          theatre,
          timing,
        },
      });
      setBookedSeats(res.data.bookedSeats || []);
    } catch (error) {
      console.log("Could not load booked seats:", error);
      setBookedSeats([]);
    } finally {
      setLoadingSeats(false);
    }
  };

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return; // already booked, can't select

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat! 💺");
      return;
    }

    navigate("/payment", {
      state: {
        movie,
        theatre,
        timing,
        seats: selectedSeats,
        total: selectedSeats.length * (ticketPrice || 250),
      },
    });
  };

  return (
    <div className="bg-black text-white min-h-screen px-5 py-10">

      <h1 className="text-4xl font-bold mb-2 text-center">Select Seats 💺</h1>

      <p className="text-center text-gray-400 mb-2">{movie.title}</p>
      <p className="text-center text-gray-400 mb-8">
        {theatre} &bull; {timing}
      </p>

      {/* Screen */}
      <div className="w-full max-w-2xl mx-auto mb-10">
        <div className="bg-gradient-to-b from-white/20 to-transparent h-3 rounded-full mb-2" />
        <p className="text-center text-gray-500 text-sm mb-8">SCREEN</p>

        {/* Legend */}
        <div className="flex gap-6 justify-center mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#333]" /> Available
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-600" /> Selected
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-600 opacity-40" /> Booked
          </div>
        </div>

        {/* Loading */}
        {loadingSeats ? (
          <p className="text-center text-gray-400 py-10">Loading seats...</p>
        ) : (
          <>
            {/* Seat Grid */}
            <div className="max-w-lg mx-auto">
              {ROWS.map((row) => (
                <div key={row} className="flex gap-2 mb-2 items-center">
                  <span className="text-gray-500 text-sm w-4">{row}</span>
                  <div className="flex gap-2 flex-wrap">
                    {Array.from({ length: 10 }, (_, i) => {
                      const seat = `${row}${i + 1}`;
                      const isBooked = bookedSeats.includes(seat);
                      const isSelected = selectedSeats.includes(seat);

                      return (
                        <button
                          key={seat}
                          onClick={() => toggleSeat(seat)}
                          disabled={isBooked}
                          title={seat}
                          className={`w-8 h-8 rounded text-xs font-bold transition
                            ${isBooked
                              ? "bg-gray-600 opacity-40 cursor-not-allowed"
                              : isSelected
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-[#333] hover:bg-[#555]"
                            }`}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Summary */}
      <div className="max-w-lg mx-auto bg-[#1a1a1a] p-6 rounded-2xl mb-6">
        <p className="text-gray-400 mb-2">
          Selected:{" "}
          <span className="text-white font-bold">
            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
          </span>
        </p>
        <p className="text-green-500 text-2xl font-bold">
          Total: ₹{selectedSeats.length * (ticketPrice || 250)}
        </p>
      </div>

      {/* Proceed Button */}
      <div className="max-w-lg mx-auto">
        <button
          onClick={handleProceed}
          className="w-full bg-red-600 py-4 rounded-2xl text-xl font-bold hover:bg-red-700 transition"
        >
          Proceed to Payment →
        </button>
      </div>

    </div>
  );
}

export default SeatSelection;

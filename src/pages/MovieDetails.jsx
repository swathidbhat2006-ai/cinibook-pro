import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { movies } from "../data/movies";

const THEATRES = {
  Bangalore: [
    { name: "PVR Orion Mall", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"] },
    { name: "PVR VR Bengaluru", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"] },
    { name: "INOX GT Mall", timings: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:30 PM"] },
    { name: "INOX Garuda Mall", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:30 PM"] },
    { name: "Cinepolis Nexus Shantiniketan", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"] },
    { name: "Cinepolis Fun Republic", timings: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM", "10:30 PM"] },
    { name: "PVR Vega City", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:30 PM", "9:30 PM"] },
    { name: "Urvashi Theatre", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"] },
    { name: "Gopalan Cinemas", timings: ["9:30 AM", "12:30 PM", "3:30 PM", "7:00 PM", "10:00 PM"] },
    { name: "Innovative Multiplex", timings: ["10:00 AM", "1:00 PM", "4:30 PM", "7:30 PM"] },
  ],
  Hyderabad: [
    { name: "AMB Cinemas", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"] },
    { name: "PVR IMAX Irram Manzil", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"] },
    { name: "Cinepolis Inorbit Mall", timings: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:30 PM"] },
    { name: "INOX GVK One", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:30 PM"] },
    { name: "Prasads Multiplex", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"] },
    { name: "Asian Mukta Cinemas", timings: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM", "10:30 PM"] },
    { name: "Sudarshan 35mm", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:30 PM"] },
    { name: "Devi 70MM", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"] },
    { name: "PVR Nexus Hyderabad", timings: ["9:30 AM", "12:30 PM", "3:30 PM", "7:00 PM"] },
  ],
  Mumbai: [
    { name: "PVR Phoenix Marketcity", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"] },
    { name: "INOX R-City Mall", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"] },
    { name: "Cinepolis Viviana Mall", timings: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:30 PM"] },
    { name: "Gaiety Galaxy", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:30 PM"] },
    { name: "PVR Juhu", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:30 PM"] },
    { name: "Regal Cinema", timings: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"] },
    { name: "Metro Inox", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:30 PM", "9:30 PM"] },
    { name: "Sterling Cinema", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"] },
    { name: "Cinepolis Andheri", timings: ["9:30 AM", "12:30 PM", "3:30 PM", "7:00 PM", "10:00 PM"] },
  ],
  Chennai: [
    { name: "SPI Palazzo", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"] },
    { name: "PVR Skywalk", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"] },
    { name: "Rohini Silver Screens", timings: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:30 PM"] },
    { name: "INOX Garuda Chennai", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:30 PM"] },
    { name: "Cinepolis VR Chennai", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:30 PM"] },
    { name: "Albert Theatre", timings: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"] },
    { name: "Sathyam Cinemas", timings: ["9:00 AM", "12:00 PM", "3:00 PM", "6:30 PM", "9:30 PM"] },
    { name: "AGS Cinemas", timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"] },
    { name: "Escape Cinemas", timings: ["9:30 AM", "12:30 PM", "3:30 PM", "7:00 PM"] },
  ],
};

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const locationState = useLocation();

  const [selectedCity, setSelectedCity] = useState("Bangalore");

  let movie = locationState.state?.movie || null;
  if (!movie) {
    movie = movies.find((m) => m.id === Number(id));
  }

  if (!movie) {
    return (
      <div className="bg-black text-white min-h-screen flex justify-center items-center text-4xl">
        Movie Not Found 😭
      </div>
    );
  }

  const theatreList = THEATRES[selectedCity];

  return (
    <div className="bg-black text-white min-h-screen px-10 py-10">
      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="bg-gray-700 px-5 py-3 rounded-lg mb-10 hover:bg-gray-600"
      >
        ← Back
      </button>

      {/* Movie Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full max-w-[500px] rounded-2xl shadow-2xl"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/500x750/1a1a1a/666?text=No+Poster";
          }}
        />

        <div>
          <h1 className="text-6xl font-bold mb-6">{movie.title}</h1>

          {movie.isLive && (
            <div className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              NOW PLAYING
            </div>
          )}

          <div className="flex gap-5 mb-6 flex-wrap">
            <span className="bg-red-600 px-4 py-2 rounded-lg">⭐ {movie.rating}</span>
            <span className="bg-gray-700 px-4 py-2 rounded-lg">{movie.language}</span>
            {movie.duration && movie.duration !== "—" && (
              <span className="bg-gray-700 px-4 py-2 rounded-lg">{movie.duration}</span>
            )}
          </div>

          <p className="text-gray-300 text-lg leading-8">
            {movie.description || "No description available."}
          </p>
        </div>
      </div>

      {/* City Selector */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">
          Theatres in {selectedCity}
          <span className="ml-3 text-xl text-gray-400 font-normal">
            ({theatreList.length} theatres)
          </span>
        </h2>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="bg-[#1f1f1f] px-5 py-3 rounded-lg border border-gray-700 text-white text-lg"
        >
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Mumbai</option>
          <option>Chennai</option>
        </select>
      </div>

      {/* Theatre List */}
      <div className="space-y-6">
        {theatreList.map((theatre, index) => (
          <div key={index} className="bg-[#1a1a1a] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{theatre.name}</h3>
              <span className="text-gray-500 text-sm">
                {theatre.timings.length} shows
              </span>
            </div>

            <div className="flex gap-3 flex-wrap">
              {theatre.timings.map((time, i) => (
                <button
                  key={i}
                  onClick={() =>
                    navigate("/seats", {
                      state: { movie, theatre: theatre.name, timing: time },
                    })
                  }
                  className="bg-[#111] border border-gray-700 hover:border-red-600 hover:bg-red-600 px-6 py-3 rounded-lg transition text-lg font-medium"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrailerModal from "../components/TrailerModal";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { movies as staticMovies } from "../data/movies";

const TMDB_API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

// Real theatres for each city with 7+ options
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

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [tmdbMovies, setTmdbMovies] = useState([]);
  const [tmdbLoading, setTmdbLoading] = useState(true);
  const [tmdbError, setTmdbError] = useState(false);

  const fetchTrailerKey = async (tmdbId) => {
    try {
      const res = await fetch(
        `${TMDB_BASE}/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const data = await res.json();
      const trailer = data.results?.find(
        (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
      );
      return trailer ? trailer.key : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        setTmdbLoading(true);
        const res = await fetch(
          `${TMDB_BASE}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1&region=IN`
        );
        if (!res.ok) throw new Error("TMDB fetch failed");
        const data = await res.json();

        const mapped = (data.results || []).slice(0, 8).map((m) => ({
          id: `tmdb-${m.id}`,
          tmdbId: m.id,
          title: m.title,
          rating: m.vote_average ? m.vote_average.toFixed(1) : "N/A",
          language: m.original_language?.toUpperCase() || "EN",
          duration: "—",
          image: m.poster_path ? `${TMDB_IMG}${m.poster_path}` : null,
          backdrop: m.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}`
            : null,
          description: m.overview,
          trailerKey: null,
          theatres: THEATRES, // all cities with full theatre lists
          isLive: true,
        }));

        setTmdbMovies(mapped);
      } catch (err) {
        console.error("TMDB Error:", err);
        setTmdbError(true);
      } finally {
        setTmdbLoading(false);
      }
    };

    fetchNowPlaying();
  }, []);

  const handleWatchTrailer = async (movie) => {
    if (movie.trailer) {
      const youtubeKey = movie.trailer.split("/embed/")[1];
      window.open(`https://www.youtube.com/watch?v=${youtubeKey}`, "_blank");
      return;
    }
    if (movie.tmdbId) {
      const key = await fetchTrailerKey(movie.tmdbId);
      if (key) {
        window.open(`https://www.youtube.com/watch?v=${key}`, "_blank");
      } else {
        window.open(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " official trailer")}`,
          "_blank"
        );
      }
    }
  };

  const tmdbTitles = new Set(tmdbMovies.map((m) => m.title.toLowerCase()));
  const deduplicatedStatic = staticMovies.filter(
    (m) => !m.comingSoon && !tmdbTitles.has(m.title.toLowerCase())
  );

  const allMovies = [...tmdbMovies, ...deduplicatedStatic];

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const comingSoonMovies = staticMovies.filter((m) => m.comingSoon);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleBookTickets = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero tmdbMovies={tmdbMovies} />
      <SearchBar search={search} setSearch={setSearch} />

      {!tmdbError && (
        <section className="px-10 pb-4 pt-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">
              Live · Now Playing in India
            </span>
          </div>
        </section>
      )}

      <section className="px-10 py-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-5xl font-bold">
            {search ? "Search Results" : "Movies in Theatres"}
          </h2>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-[#1f1f1f] px-4 py-3 rounded-lg border border-gray-700"
          >
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Mumbai</option>
            <option>Chennai</option>
          </select>
        </div>

        {tmdbLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full h-[420px] bg-gray-800"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-700 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded mb-2 w-1/2"></div>
                  <div className="h-10 bg-gray-700 rounded mt-5"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!tmdbLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl transition duration-300 hover:scale-105"
              >
                {movie.isLive && (
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    NOW PLAYING
                  </div>
                )}

                <button
                  onClick={() => toggleFavorite(movie.id)}
                  className="absolute top-4 right-4 z-10 text-3xl"
                >
                  {favorites.includes(movie.id) ? "❤️" : "🤍"}
                </button>

                {movie.image ? (
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-[420px] object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/500x750/1a1a1a/666?text=No+Poster";
                    }}
                  />
                ) : (
                  <div className="w-full h-[420px] bg-gray-800 flex items-center justify-center text-gray-500 text-lg">
                    No Poster
                  </div>
                )}

                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold leading-tight flex-1 mr-2">
                      {movie.title}
                    </h3>
                    <span className="bg-red-600 px-2 py-1 rounded text-sm whitespace-nowrap">
                      ⭐ {movie.rating}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-2">{movie.language}</p>
                  <p className="text-gray-500 mb-5">{movie.duration}</p>

                  <button
                    onClick={() => handleBookTickets(movie)}
                    className="bg-red-600 w-full py-3 rounded-lg hover:bg-red-700 transition"
                  >
                    Book Tickets
                  </button>

                  <button
                    onClick={() => handleWatchTrailer(movie)}
                    className="mt-3 bg-gray-700 w-full py-3 rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
                  >
                    ▶ Watch Trailer
                  </button>
                </div>
              </div>
            ))}

            {filteredMovies.length === 0 && !tmdbLoading && (
              <div className="col-span-4 text-center py-20 text-gray-500 text-2xl">
                No movies found for "{search}" 😭
              </div>
            )}
          </div>
        )}
      </section>

      <TrailerModal
        show={showTrailer}
        setShow={setShowTrailer}
        trailer={currentTrailer}
      />

      <section className="px-6 py-16 overflow-hidden">
        <h2 className="text-5xl font-bold mb-10">Coming Soon 🍿</h2>

        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth">
          {comingSoonMovies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[280px] bg-[#1a1a1a] rounded-3xl overflow-hidden opacity-80 hover:opacity-100 transition"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-[420px] object-cover"
              />
              <div className="p-5">
                <h3 className="text-3xl font-bold mb-3">{movie.title}</h3>
                <p className="text-gray-400 mb-2">{movie.language}</p>
                <p className="text-red-500 text-xl font-bold mb-4">
                  Releasing: {movie.releaseDate}
                </p>
                {movie.trailer && (
                  <button
                    onClick={() => handleWatchTrailer(movie)}
                    className="bg-gray-700 w-full py-3 rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
                  >
                    ▶ Watch Trailer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

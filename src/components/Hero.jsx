import { useEffect, useState } from "react";

const staticBanners = [
  {
    title: "Avengers Endgame",
    subtitle: "The biggest Marvel battle ever 🔥",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1400",
  },
  {
    title: "Interstellar",
    subtitle: "Experience space like never before 🚀",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1400",
  },
  {
    title: "Spider Man",
    subtitle: "Enter the world of chaos 🎭",
    image: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=1400",
  },
];

function Hero({ tmdbMovies = [] }) {
  const [current, setCurrent] = useState(0);

  // Build banner list: prefer TMDB movies with backdrop images
  const liveBanners = tmdbMovies
    .filter((m) => m.backdrop)
    .slice(0, 5)
    .map((m) => ({
      title: m.title,
      subtitle: m.description
        ? m.description.slice(0, 80) + (m.description.length > 80 ? "…" : "")
        : "Now playing in theatres 🎬",
      image: m.backdrop,
      rating: m.rating,
      isLive: true,
    }));

  const banners = liveBanners.length > 0 ? liveBanners : staticBanners;

  useEffect(() => {
    // Reset to first slide when banners change
    setCurrent(0);
  }, [banners.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const banner = banners[current];

  return (
    <section
      className="h-[80vh] bg-cover bg-center flex flex-col justify-center items-center text-center relative transition-all duration-700"
      style={{ backgroundImage: `url(${banner.image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>

      {/* Live badge */}
      {banner.isLive && (
        <div className="relative z-10 mb-4 flex items-center gap-2 bg-red-600/90 px-4 py-1.5 rounded-full text-sm font-semibold">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          NOW PLAYING IN THEATRES
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 px-5 max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-5 drop-shadow-2xl">
          {banner.title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-3">{banner.subtitle}</p>

        {banner.rating && (
          <p className="text-yellow-400 text-lg font-semibold mb-6">
            ⭐ {banner.rating} / 10
          </p>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-2xl text-xl font-semibold transition"
        >
          Book Now
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 flex gap-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              current === index
                ? "bg-red-600 w-8 h-4"
                : "bg-white/50 w-4 h-4"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Hero;

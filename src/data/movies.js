import peddi from "../assets/peddi.jpg";
import paradise from "../assets/paradise.jpg";
import cocktail from "../assets/cocktail.jpg";

// Only Coming Soon movies are kept here.
// All "Now Playing" movies are fetched live from TMDB in Home.jsx
export const movies = [
  {
    id: 8,
    title: "Peddi",
    rating: "Coming Soon",
    language: "Telugu",
    duration: "TBA",
    image: peddi,
    trailer: "https://www.youtube.com/embed/yTsGx14Rhrk",
    releaseDate: "June 2026",
    comingSoon: true,
  },
  {
    id: 9,
    title: "Cocktail 2",
    rating: "Coming Soon",
    language: "Hindi",
    duration: "TBA",
    image: cocktail,
    trailer: "https://www.youtube.com/embed/7n0_vCu4bJg",
    releaseDate: "June 2026",
    comingSoon: true,
  },
  {
    id: 10,
    title: "Paradise",
    rating: "Coming Soon",
    language: "Telugu",
    duration: "TBA",
    image: paradise,
    trailer: "https://www.youtube.com/embed/NkZFnpDhdCk",
    releaseDate: "June 2026",
    comingSoon: true,
  },
];
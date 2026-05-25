import { useState } from "react";

function Admin() {

  const [movies, setMovies] =
    useState(
      JSON.parse(
        localStorage.getItem("adminMovies")
      ) || []
    );

  const [title, setTitle] =
    useState("");

  const [image, setImage] =
    useState("");

  const addMovie = () => {

    if (!title || !image) {

      alert(
        "Fill all fields 😭"
      );

      return;
    }

    const newMovie = {
      id: Date.now(),
      title,
      image,
    };

    const updatedMovies = [
      ...movies,
      newMovie,
    ];

    setMovies(updatedMovies);

    localStorage.setItem(
      "adminMovies",
      JSON.stringify(updatedMovies)
    );

    setTitle("");

    setImage("");

    alert(
      "Movie Added 😭🔥"
    );

  };

  const deleteMovie =
    (id) => {

      const filtered =
        movies.filter(
          (movie) =>
            movie.id !== id
        );

      setMovies(filtered);

      localStorage.setItem(
        "adminMovies",
        JSON.stringify(filtered)
      );

    };

  return (
    <div className="bg-black text-white min-h-screen px-10 py-10">

      <h1 className="text-5xl font-bold mb-10">
        Admin Panel 👨‍💻
      </h1>

      {/* Add Movie */}
      <div className="bg-[#1a1a1a] p-8 rounded-3xl mb-10">

        <h2 className="text-3xl font-bold mb-6">
          Add Movie 🎬
        </h2>

        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full bg-[#222] px-5 py-4 rounded-xl mb-5 outline-none"
        />

        <input
          type="text"
          placeholder="Poster URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          className="w-full bg-[#222] px-5 py-4 rounded-xl mb-5 outline-none"
        />

        <button
          onClick={addMovie}
          className="bg-red-600 px-8 py-4 rounded-xl hover:bg-red-700 transition"
        >
          Add Movie
        </button>

      </div>

      {/* Movie List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {movies.map((movie) => (

          <div
            key={movie.id}
            className="bg-[#1a1a1a] rounded-3xl overflow-hidden"
          >

            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-[350px] object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold mb-5">
                {movie.title}
              </h2>

              <button
                onClick={() =>
                  deleteMovie(movie.id)
                }
                className="w-full bg-red-600 py-3 rounded-xl hover:bg-red-700 transition"
              >
                Delete Movie 🗑
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Admin;
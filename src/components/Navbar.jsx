import { useState } from "react";

import LoginModal from "./LoginModal";

function Navbar() {

  const [showLogin, setShowLogin] =
    useState(false);

  const [user, setUser] =
    useState("");

  return (
    <>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-black border-b border-gray-800 sticky top-0 z-40">

        {/* Logo */}
        <h1 className="text-4xl font-bold text-red-600 cursor-pointer">
          CineBook 🎬
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Location */}
          <button className="bg-gray-800 px-5 py-3 rounded-xl hover:bg-gray-700 transition">
            Bangalore 📍
          </button>

          {/* My Bookings */}
          <button
            onClick={() =>
              window.location.href =
                "/my-bookings"
            }
            className="bg-gray-800 px-5 py-3 rounded-xl hover:bg-gray-700 transition"
          >
            My Bookings 🎟
          </button>

          {/* User/Login */}
          {user ? (

            <div className="bg-red-600 px-5 py-3 rounded-xl font-semibold">
              Hi, {user} 👋
            </div>

          ) : (

            <button
              onClick={() =>
                setShowLogin(true)
              }
              className="bg-red-600 px-6 py-3 rounded-xl hover:bg-red-700 transition"
            >
              Login
            </button>

          )}

        </div>

      </nav>

      {/* Login Modal */}
      <LoginModal
        show={showLogin}
        setShow={setShowLogin}
        setUser={setUser}
      />

    </>
  );
}

export default Navbar;
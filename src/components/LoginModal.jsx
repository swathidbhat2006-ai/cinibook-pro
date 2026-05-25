import { useState } from "react";

import axios from "axios";

function LoginModal({

  show,
  setShow,
  setUser,

}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  /* LOGIN */
  const handleLogin =
    async () => {

      if (!email || !password) {

        alert(
          "Please fill all fields 😭"
        );

        return;
      }

      try {

        const response =
          await axios.post(
            "http://localhost:5000/login",
            {
              email,
              password,
            }
          );

        const username =
          response.data.user.username;

        setUser(username);
        localStorage.setItem(
  "userEmail",
  email
);

        setShow(false);

        alert(
          `Welcome ${username} 🎉`
        );

      } catch (error) {

        alert(
          "Invalid Credentials 😭"
        );

      }

    };

  /* REGISTER */
  const handleRegister =
    async () => {

      if (!email || !password) {

        alert(
          "Please fill all fields 😭"
        );

        return;
      }

      try {

        await axios.post(
          "http://localhost:5000/register",
          {
            username:
              email.split("@")[0],

            email,

            password,
          }
        );

        alert(
          "Registered Successfully 😭🔥"
        );

      } catch (error) {

        alert(
          "User already exists 😭"
        );

      }

    };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 px-5">

      <div className="bg-[#1a1a1a] p-10 rounded-3xl w-full max-w-md">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Login 👤
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-[#222] px-5 py-4 rounded-xl mb-5 outline-none"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full bg-[#222] px-5 py-4 rounded-xl mb-8 outline-none"
        />

        {/* Buttons */}
        <div className="flex gap-4">

          {/* Cancel */}
          <button
            onClick={() =>
              setShow(false)
            }
            className="flex-1 bg-gray-700 py-4 rounded-xl hover:bg-gray-600 transition"
          >
            Cancel
          </button>

          {/* Login */}
          <button
            onClick={handleLogin}
            className="flex-1 bg-red-600 py-4 rounded-xl hover:bg-red-700 transition"
          >
            Login
          </button>

          {/* Register */}
          <button
            onClick={handleRegister}
            className="flex-1 bg-blue-600 py-4 rounded-xl hover:bg-blue-700 transition"
          >
            Register
          </button>

        </div>

      </div>

    </div>
  );
}

export default LoginModal;
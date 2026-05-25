const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cors = require("cors");
const Booking = require("./models/Booking");
require("dotenv").config();
const User = require("./models/User");

const app = express();

/* Email Transport */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "swathidbhat2006@gmail.com",
    pass: "tirdwflwfhaznpry",
  },
});

/* Middleware */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 😭🔥"))
  .catch((err) => console.log(err));

/* Test Route */
app.get("/", (req, res) => {
  res.send("Backend Running 😭🔥");
});

/* ✅ FIX 3: Get booked seats for a specific movie + theatre + timing */
app.get("/booked-seats", async (req, res) => {
  try {
    const { movie, theatre, timing } = req.query;

    const bookings = await Booking.find({
      movie,
      theatre,
      timing,
    });

    // Flatten all seats from matching bookings into one array
    const bookedSeats = bookings.flatMap((b) => b.seats);

    res.status(200).json({ bookedSeats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ✅ FIX 1 & 2: Save Booking */
app.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    /* Send Email */
    try {
      await transporter.sendMail({
        from: "swathidbhat2006@gmail.com",
        to: req.body.email,
        subject: "Movie Ticket Booking 🎟",
        text: `
Booking Confirmed 🎉

Movie: ${req.body.movie}
Theatre: ${req.body.theatre}
Seats: ${req.body.seats}
Timing: ${req.body.timing}
Total: ₹${req.body.total}
        `,
      });
    } catch (emailError) {
      // Don't fail the booking if email fails
      console.log("Email error (non-fatal):", emailError.message);
    }

    res.status(201).json({ message: "Booking Saved 😭🔥" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Register User */
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists 😭" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User Registered 😭🔥" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Login User */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials 😭" });
    }

    res.status(200).json({ message: "Login Successful 😭🔥", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ✅ FIX 2: Get bookings filtered by logged-in user's email */
app.get("/bookings", async (req, res) => {
  try {
    const { email } = req.query;

    // If email provided, return only that user's bookings
    const filter = email ? { email } : {};
    const bookings = await Booking.find(filter);

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ✅ FIX 2: Delete Booking */
app.delete("/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking Deleted 😭🔥" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
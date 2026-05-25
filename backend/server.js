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
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* Test Route */
app.get("/", (req, res) => {
  res.send("Backend Running");
});

/* Save Booking */
app.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    /* Send Email */
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

    res.status(201).json({ message: "Booking Saved" });
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
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User Registered" });
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
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    res.status(200).json({ message: "Login Successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Get All Bookings — optionally filter by movie+theatre+timing */
app.get("/bookings", async (req, res) => {
  try {
    const { movie, theatre, timing } = req.query;
    let filter = {};
    if (movie) filter.movie = movie;
    if (theatre) filter.theatre = theatre;
    if (timing) filter.timing = timing;
    const bookings = await Booking.find(filter);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Get bookings by user email */
app.get("/bookings/user/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.params.email });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Delete Booking */
app.delete("/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

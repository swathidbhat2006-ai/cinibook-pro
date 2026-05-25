const mongoose =
  require("mongoose");

const bookingSchema =
  new mongoose.Schema({

    movie: {
      type: String,
      required: true,
    },

    theatre: {
      type: String,
      required: true,
    },

    timing: {
      type: String,
      required: true,
    },

    seats: {
      type: Array,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

  });

module.exports =
  mongoose.model(
    "Booking",
    bookingSchema
  );
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },

    bookingDate: {
      type: String,
      required: true,
    },

    // 30 min slot timings
    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    slotNumber: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "booked",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", bookingSchema);

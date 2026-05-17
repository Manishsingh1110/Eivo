const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const stationSchema = new mongoose.Schema(
  {
    stationName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "station",
    },

    latitude: Number,

    longitude: Number,

    chargerType: String,

    totalSlots: {
      type: Number,
      default: 5,
    },

    pricePerHour: {
      type: Number,
      default: 100,
    },

    // Booking References
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  {
    timestamps: true,
  },
);

stationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

stationSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Station", stationSchema);

const Booking = require("../models/Booking");
const Station = require("../models/Station");

/*
|--------------------------------------------------------------------------
| Create Booking
|--------------------------------------------------------------------------
*/
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createBooking = async (req, res) => {
  try {
    const { stationId, bookingDate, startTime, endTime } = req.body;

    // Get Token
    const token = req.headers.authorization.split(" ")[1];

    // Decode Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const station = await Station.findById(stationId);

    if (!station) {
      return res.status(404).json({
        message: "Station not found",
      });
    }

    // Find existing bookings for same station/date/time
    const existingBookings = await Booking.find({
      station: stationId,
      bookingDate,
      startTime,
      status: "booked",
    });

    // Check if all slots are occupied
    if (existingBookings.length >= station.totalSlots) {
      return res.status(400).json({
        message: "No slots available for this time",
      });
    }

    // Generate available slot number
    let slotNumber = 1;

    const usedSlots = existingBookings.map((booking) => booking.slotNumber);

    while (usedSlots.includes(slotNumber)) {
      slotNumber++;
    }

    // 30 mins booking amount
    const totalAmount = station.pricePerHour / 2;

    const booking = await Booking.create({
      user: user._id,
      station: stationId,
      bookingDate,
      startTime,
      endTime,
      slotNumber,
      totalAmount,
    });

    // Push booking reference into station
    await Station.findByIdAndUpdate(stationId, {
      $push: {
        bookings: booking._id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Bookings
|--------------------------------------------------------------------------
*/
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("station", "stationName chargerType");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Logged In User Bookings
|--------------------------------------------------------------------------
*/
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    }).populate("station", "stationName chargerType");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Station Bookings
|--------------------------------------------------------------------------
*/
const getStationBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      station: req.user._id,
    }).populate("user", "name email");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Booking Status
|--------------------------------------------------------------------------
*/
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }

    booking.status = status;

    await booking.save();

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Cancel Booking
|--------------------------------------------------------------------------
*/
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.json({
      success: true,
      message: "Booking Cancelled Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| My Bookings
|--------------------------------------------------------------------------
*/

const getMyBookings = async (req, res) => {
  try {
    // Get Token
    const token = req.headers.authorization.split(" ")[1];

    // Decode Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get User Bookings
    const bookings = await Booking.find({
      user: user._id,
    }).populate("station", "stationName chargerType totalSlots");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getUserBookings,
  getStationBookings,
  updateBookingStatus,
  cancelBooking,
  getMyBookings,
};

const express = require("express");

const router = express.Router();

const {
  createBooking,
  getAllBookings,
  getUserBookings,
  getStationBookings,
  updateBookingStatus,
  cancelBooking,
  getMyBookings,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", createBooking);

router.get("/my-bookings",  getMyBookings);

router.get("/", protect, getAllBookings);

router.get("/user", protect, getUserBookings);

router.get("/station", protect, getStationBookings);

router.put("/:id/status", protect, updateBookingStatus);

router.put("/cancel/:id", protect, cancelBooking);

module.exports = router;

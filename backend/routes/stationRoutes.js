const express = require("express");

const router = express.Router();

const {
  getStations,
  getStationById,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");

const { protect } = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", getStations);

router.get("/:id", getStationById);

router.put("/:id", protect, authorizeRoles("station"), updateStation);

router.delete("/:id", protect, authorizeRoles("station"), deleteStation);

module.exports = router;

const Station = require("../models/Station");

const getStations = async (req, res) => {
  try {
    const stations = await Station.find();

    res.json(stations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        message: "Station Not Found",
      });
    }

    res.json(station);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        message: "Station Not Found",
      });
    }

    const {
      stationName,
      latitude,
      longitude,
      chargerType,
      totalSlots,
      availableSlots,
      pricePerHour,
    } = req.body;

    if (stationName !== undefined) {
      station.stationName = stationName;
    }

    if (latitude !== undefined) {
      station.latitude = latitude;
    }

    if (longitude !== undefined) {
      station.longitude = longitude;
    }

    if (chargerType !== undefined) {
      station.chargerType = chargerType;
    }

    if (totalSlots !== undefined) {
      station.totalSlots = totalSlots;
    }

    if (availableSlots !== undefined) {
      station.availableSlots = availableSlots;
    }

    if (pricePerHour !== undefined) {
      station.pricePerHour = pricePerHour;
    }

    const updatedStation = await station.save();

    res.json(updatedStation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        message: "Station Not Found",
      });
    }

    await station.deleteOne();

    res.json({
      message: "Station Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStations,
  getStationById,
  updateStation,
  deleteStation,
};

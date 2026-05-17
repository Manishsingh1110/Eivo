const User = require("../models/User");
const Station = require("../models/Station");

const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, vehicleModel, chargerType } =
      req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      vehicleModel,
      chargerType,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const registerStation = async (req, res) => {
  try {
    const {
      stationName,
      email,
      password,
      latitude,
      longitude,
      chargerType,
      totalSlots,
      availableSlots,
      pricePerHour,
    } = req.body;

    const existingStation = await Station.findOne({ email });

    if (existingStation) {
      return res.status(400).json({
        message: "Station already exists",
      });
    }

    const station = await Station.create({
      stationName,
      email,
      password,
      latitude,
      longitude,
      chargerType,
      totalSlots,
      availableSlots,
      pricePerHour,
    });

    res.status(201).json({
      _id: station._id,
      stationName: station.stationName,
      email: station.email,
      role: station.role,
      token: generateToken(station._id, station.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginStation = async (req, res) => {
  try {
    const { email, password } = req.body;

    const station = await Station.findOne({
      email,
    });

    if (!station || !(await station.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    res.json({
      _id: station._id,
      stationName: station.stationName,
      email: station.email,
      role: station.role,
      token: generateToken(station._id, station.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  registerStation,
  loginStation,
};

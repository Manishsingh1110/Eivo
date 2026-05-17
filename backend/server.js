const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("EV Charging Backend Running");
});

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/bookings", require("./routes/bookingRoutes"));

app.use("/api/stations", require("./routes/stationRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  registerStation,
  loginStation,
} = require("../controllers/authController");

router.post("/user/register", registerUser);

router.post("/user/login", loginUser);

router.post("/station/register", registerStation);

router.post("/station/login", loginStation);

module.exports = router;

const User = require("../models/User");

const getUsers = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const { name, phone, vehicleModel, batteryPercentage, chargerType } =
      req.body;

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (vehicleModel !== undefined) {
      user.vehicleModel = vehicleModel;
    }

    if (batteryPercentage !== undefined) {
      user.batteryPercentage = batteryPercentage;
    }

    if (chargerType !== undefined) {
      user.chargerType = chargerType;
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User Deleted",
  });
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

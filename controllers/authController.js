const mongoose = require("mongoose");

const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "User created",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "User not created",
      error,
    });
  }
};

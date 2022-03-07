const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect("/user/dashboard");
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "User Not Login",
      error,
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {

  const user = await User.findOne({_id:req.session.userID})

  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user
  });
};

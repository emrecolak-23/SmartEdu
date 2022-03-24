const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors.array()[0].msg);
    
    errors.array().forEach(x => {
      req.flash('error', `${x.msg}`);
    })
    res.status(400).redirect("/register");
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
        } else {
          req.flash('error',"Your password is not correct");
          res.status(400).redirect('/login');
        }
      });
    } else {
      req.flash('error', "User is not exist!");
      res.status(400).redirect('/login');
    }
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors.array()[0].msg);
    errors.array().forEach(err=>{
      req.flash("error", `${err.msg}`)
    })
    res.status(400).redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  const users = await User.find()
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
    users
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove({ _id: req.params.id });
    
    await Course.deleteMany({user:req.params.id})
    
    req.flash("error", `${user.name} is removed`);
    res.status(200).redirect("/user/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "User not deleted",
      error,
    });
  }
};

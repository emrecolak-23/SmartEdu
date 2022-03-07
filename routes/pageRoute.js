const PageController = require("../controllers/pageController");

const express = require("express");

const router = express.Router();

// Index Page
router.route("/").get(PageController.getHomePage);

// About Page
router.route("/about").get(PageController.getAboutPage);

// Register Page
router.route("/register").get(PageController.getRegisterPage);

// Login Page
router.route("/login").get(PageController.getLoginPage);

module.exports = router;
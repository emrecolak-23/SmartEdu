const PageController = require("../controllers/pageController");

const express = require("express");

const router = express.Router();

// Index Page
router.route("/").get(PageController.getHomePage);

// About Page
router.route("/about").get(PageController.getAboutPage);

module.exports = router;
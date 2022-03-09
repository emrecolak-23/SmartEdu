const PageController = require("../controllers/pageController");
const RedirectMiddleware = require("../middlewares/redirectMiddlewares");


const express = require("express");

const router = express.Router();

// Index Page
router.route("/").get(PageController.getHomePage);

// About Page
router.route("/about").get(PageController.getAboutPage);

// Register Page
router.route("/register").get(RedirectMiddleware,PageController.getRegisterPage);

// Login Page
router.route("/login").get(RedirectMiddleware,PageController.getLoginPage);

// Contact Page
router.route("/contact").get(PageController.getContactPage);
router.route("/contact").post(PageController.sendEmail);


module.exports = router;
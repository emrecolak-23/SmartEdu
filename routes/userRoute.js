const express = require("express");

const AuthMiddleware = require("../middlewares/authMiddlewares");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(AuthController.createUser);

router.route("/login").post(AuthController.loginUser);

router.route("/logout").get(AuthController.logout);

router.route("/dashboard").get(AuthMiddleware, AuthController.getDashboardPage);

module.exports = router;

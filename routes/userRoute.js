const express = require("express");

const AuthController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(AuthController.createUser);

module.exports = router;

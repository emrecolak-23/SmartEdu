const express = require("express");
const User = require("../models/User")

const AuthMiddleware = require("../middlewares/authMiddlewares");
const AuthController = require("../controllers/authController");
const { body } = require('express-validator');

const router = express.Router();

router.route("/signup").post([
  body('name').not().isEmpty().withMessage("Please Enter Your Name"),
  body('email').isEmail().withMessage('Please Enter Valid Email')
  .custom((userEmail)=>{
    return User.findOne({email:userEmail}).then(user=>{
      if (user) {
        return Promise.reject('Email is already exist!')
      }
    })
  }),
  body('password').not().isEmpty().withMessage('Please Enter Your Password')
],AuthController.createUser);

router.route("/login").post(AuthController.loginUser);

router.route("/logout").get(AuthController.logout);

router.route("/dashboard").get(AuthMiddleware, AuthController.getDashboardPage);

router.route("/:id").delete(AuthController.deleteUser);


module.exports = router;

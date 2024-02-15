const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  loginUser,
  registerUser,
  getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

//local auth routes
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/user").get(protect, getUserInfo);

module.exports = router;

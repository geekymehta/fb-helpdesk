const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../model/errorModel");
const mongoose = require("mongoose");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Please fill in all required fields", 400);
  }

  const emailAlreadyRegistered = await User.findOne({ email: email });

  if (emailAlreadyRegistered) {
    throw new AppError(
      "This email is already registered with us, try logging in instead",
      400
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = new User({
    name,
    email,
    passwordHash: hashedPassword,
  });

  await user.save();

  const token = generateToken(user._id);

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (!userExists) {
    throw new AppError("User does not exist", 400);
  }

  const matchedPassword = await bcrypt.compare(
    password,
    userExists.passwordHash
  );

  if (!matchedPassword) {
    throw new AppError("Oops!, Wrong Password", 400);
  }

  const user = userExists;
  const token = generateToken(user._id);
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

const getUserInfo = (req, res) => {
  const { _id, name, email } = req.user;

  res.status(200).json({
    _id,
    name,
    email,
  });
};

const generateToken = (id) => {
  expirationTimeInSeconds = 60 * 60; // eg. 30 * 24 * 60 * 60; -> 30 days in seconds
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expirationTimeInSeconds,
  });
};

module.exports = { registerUser, loginUser, getUserInfo, generateToken };

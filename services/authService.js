const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const userService = require("./userService");

exports.register = async (userData) => {
  const user = new User(userData);
  await user.save();
  const token = generateAuthToken(user);
  return { user, token };
};

exports.login = async (emailOrUsername, password) => {
  const user = await userService.findByCredentials(emailOrUsername, password);
  const token = generateAuthToken(user);
  return { user, token };
};

exports.logout = async (user, token) => {
  // Implement logout logic
};

// Utility functions
const generateAuthToken = (user) => {
  return jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
};

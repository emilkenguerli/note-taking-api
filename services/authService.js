const jwt = require("jsonwebtoken");
const userService = require("./userService");

exports.register = async (userData) => {
  try {
    const user = await userService.createUser(userData);
    const token = generateAuthToken(user);
    return { user, token };
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(`Registration failed: ${error.message}`);
  }
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

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

exports.createUser = async (userData) => {
  const user = new User(userData);
  try {
    await user.save();
    return user;
  } catch (error) {
    console.error("User creation failed:", JSON.stringify(error, null, 2));
    if (error.name === "ValidationError") {
      throw new AppError(
        `Validation failed: ${Object.values(error.errors)
          .map((e) => e.message)
          .join(", ")}`
      );
    }
    throw new AppError(`User creation failed: ${error.message}`);
  }
};

exports.getUsers = async () => {
  const users = await User.find({ deletedAt: null });
  if (!users || users.length === 0) {
    throw new AppError("No users found");
  }
  return users;
};

exports.updateUser = async (user, updates) => {
  Object.keys(updates).forEach((update) => (user[update] = updates[update]));
  await user.save();
  return user;
};

exports.deleteUser = async (userId) => {
  const user = await User.findOne({ _id: userId, deletedAt: null });
  if (!user) {
    throw new AppError("User not found");
  }
  user.deletedAt = new Date();
  await user.save();
  return user;
};

exports.findByCredentials = async (emailOrUsername, password) => {
  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });

  if (!user) {
    throw new AppError("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Unable to login");
  }

  return user;
};

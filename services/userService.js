const User = require("../models/User");

exports.createUser = async (userData) => {
  console.log(userData);
  const user = new User(userData);
  try {
    await user.save();
    return user;
  } catch (error) {
    console.error("User creation failed:", JSON.stringify(error, null, 2));
    if (error.name === "ValidationError") {
      throw new Error(
        `Validation failed: ${Object.values(error.errors)
          .map((e) => e.message)
          .join(", ")}`
      );
    }
    throw new Error(`User creation failed: ${error.message}`);
  }
};

exports.getUser = async (userId) => {
  const user = await User.findOne({ _id: userId, deletedAt: null });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

exports.updateUser = async (user, updates) => {
  Object.keys(updates).forEach((update) => (user[update] = updates[update]));
  await user.save();
  return user;
};

exports.deleteUser = async (userId) => {
  const user = await User.findOne({ _id: userId, deletedAt: null });
  if (!user) {
    throw new Error("User not found");
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
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

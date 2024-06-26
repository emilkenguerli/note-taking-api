const userService = require("../services/userService");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await userService.updateUser(req.user, req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.user);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

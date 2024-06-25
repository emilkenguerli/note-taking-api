const authService = require("../services/authService");
const helpers = require("../utils/helpers");

exports.register = async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;
  if (!helpers.validateEmail(email)) {
    return res
      .status(400)
      .json(helpers.createErrorResponse("Invalid email format"));
  }
  try {
    const { user, token } = await authService.register({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    res.status(201).json({ user, token });
  } catch (error) {
    next(new Error(`Registration failed: ${error.message}`)); // Pass the error to the error handler
  }
};

exports.login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    const { user, token } = await authService.login(emailOrUsername, password);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await authService.logout(req.user, req.token);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

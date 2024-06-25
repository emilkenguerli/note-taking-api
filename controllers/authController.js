const authService = require("../services/authService");
const helpers = require("../utils/helpers");

exports.register = async (req, res, next) => {
  if (!helpers.validateEmail(email)) {
    return res
      .status(400)
      .json(helpers.createErrorResponse("Invalid email format"));
  }
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
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

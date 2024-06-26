const AppError = require("../utils/AppError");

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.isOperational && err.message) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  } else {
    res.status(500).send("Unexpected error");
  }
}

module.exports = errorHandler;

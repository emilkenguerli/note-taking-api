require("dotenv").config();

module.exports = {
  db: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/theneo",
  },
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  port: process.env.PORT || 5000,
};

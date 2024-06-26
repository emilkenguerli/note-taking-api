const express = require("express");
const cors = require("cors");
const authRoutes = require("../routes/authRoutes");
const noteRoutes = require("../routes/noteRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const userRoutes = require("../routes/userRoutes");
const errorHandler = require("../middlewares/errorHandler");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;

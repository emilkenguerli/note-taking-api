const express = require("express");
const authRoutes = require("../routes/authRoutes");
const noteRoutes = require("../routes/noteRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const userRoutes = require("../routes/userRoutes");
const errorHandler = require("../middlewares/errorHandler");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/user", userRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;

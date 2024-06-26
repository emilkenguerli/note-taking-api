const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middlewares/auth");

// Routes for categories, protected by the auth middleware
router.post("/", auth, categoryController.createCategory);
router.get("/", auth, categoryController.getCategories);
router.get("/:id", auth, categoryController.getCategory);
router.patch("/:id", auth, categoryController.updateCategory);
router.delete("/:id", auth, categoryController.deleteCategory);

module.exports = router;

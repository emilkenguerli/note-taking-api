const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const auth = require("../middlewares/auth");

// Routes for notes, protected by the auth middleware
router.post("/", auth, noteController.createNote);
router.get("/", auth, noteController.getNotes);
router.get("/:id", auth, noteController.getNote);
router.patch("/:id", auth, noteController.updateNote);
router.delete("/:id", auth, noteController.deleteNote);

module.exports = router;

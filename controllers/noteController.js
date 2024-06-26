const noteService = require("../services/noteService");
const Note = require("../models/Note");

exports.createNote = async (req, res, next) => {
  try {
    const noteData = { ...req.body };

    // Handle the category field
    if (noteData.category === "") {
      noteData.category = null;
    }

    const note = await noteService.createNote(noteData, req.user._id);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

exports.getNote = async (req, res, next) => {
  try {
    const note = await noteService.getNote(req.params.id, req.user._id);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

exports.getNotes = async (req, res, next) => {
  try {
    const notes = await noteService.getNotes(req.user._id, req.query);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

exports.updateNote = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "category", "public"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    const note = await noteService.updateNote(
      req.params.id,
      req.user._id,
      req.body
    );
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const note = await noteService.deleteNote(req.params.id, req.user._id);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

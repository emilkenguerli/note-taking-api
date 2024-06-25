const Note = require("../models/Note");

exports.createNote = async (noteData, userId) => {
  const note = new Note({
    ...noteData,
    user: userId,
  });
  await note.save();
  return note;
};

exports.getNotes = async (
  userId,
  { page = 1, limit = 10, sort = "createdAt", search = "", filters = {} }
) => {
  const query = {
    $or: [{ public: true }, { user: userId }],
    deletedAt: { $exists: false },
  };

  if (search) {
    query.$or.push({ title: new RegExp(search, "i") });
    query.$or.push({ description: new RegExp(search, "i") });
  }

  if (filters.category) {
    query.category = filters.category;
  }

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { [sort]: 1 },
  };

  const notes = await Note.paginate(query, options);
  return notes;
};

exports.getNote = async (noteId, userId) => {
  const note = await Note.findOne({
    _id: noteId,
    deletedAt: { $exists: false },
  }).populate("category");
  if (!note) {
    throw new Error("Note not found");
  }
  if (!note.public && note.user.toString() !== userId.toString()) {
    throw new Error("Access denied");
  }
  return note;
};

exports.updateNote = async (noteId, userId, updates) => {
  const note = await Note.findOne({
    _id: noteId,
    user: userId,
    deletedAt: { $exists: false },
  });
  if (!note) {
    throw new Error("Note not found");
  }
  Object.keys(updates).forEach((update) => (note[update] = updates[update]));
  note.updatedAt = Date.now();
  await note.save();
  return note;
};

exports.deleteNote = async (noteId, userId) => {
  const note = await Note.findOne({
    _id: noteId,
    user: userId,
    deletedAt: { $exists: false },
  });
  if (!note) {
    throw new Error("Note not found");
  }
  note.deletedAt = new Date();
  await note.save();
  return note;
};

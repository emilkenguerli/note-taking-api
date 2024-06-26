const Note = require("../models/Note");
const Fuse = require("fuse.js");

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
  {
    page = 1,
    limit = 10,
    sort = "createdAt",
    search = "",
    filters = {},
    users = [],
  }
) => {
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  const query = {
    $and: [
      {
        $or: [
          { public: true },
          { $and: [{ public: false }, { user: userId }] },
        ],
      },
      {
        $or: [{ deletedAt: { $exists: false } }, { deletedAt: null }],
      },
    ],
  };

  // Add category filter
  if (filters.category) {
    query.$and.push({ category: filters.category });
  }

  // Add creation date filter
  if (filters.creationDateFrom || filters.creationDateTo) {
    query.$and.push({
      createdAt: {
        ...(filters.creationDateFrom && {
          $gte: new Date(filters.creationDateFrom),
        }),
        ...(filters.creationDateTo && {
          $lte: new Date(filters.creationDateTo),
        }),
      },
    });
  }

  // Add update date filter
  if (filters.updateDateFrom || filters.updateDateTo) {
    query.$and.push({
      updatedAt: {
        ...(filters.updateDateFrom && {
          $gte: new Date(filters.updateDateFrom),
        }),
        ...(filters.updateDateTo && { $lte: new Date(filters.updateDateTo) }),
      },
    });
  }

  // Filter by user if users array is provided
  if (users.length > 0) {
    if (users.includes("select_all")) {
      // Extract unique user IDs from notes
      const userSet = new Set(notes.map((note) => note.user.toString()));
      users = Array.from(userSet);
    } else {
      // Filter notes to include only those from the specified users
      notes = notes.filter((note) => users.includes(note.user.toString()));
    }
  }

  // Fetch potential notes based on basic criteria
  let potentialNotes = await Note.find(query)
    .sort({ [sort]: 1 })
    .populate("category", "name")
    .exec();

  // Perform regex filtering on title and description
  if (search) {
    const regex = new RegExp(search, "i");
    potentialNotes = potentialNotes.filter(
      (note) => regex.test(note.title) || regex.test(note.description)
    );
  }

  // Perform fuzzy search using Fuse.js
  let notes = potentialNotes;
  if (search) {
    const options = {
      keys: ["title", "description"],
      threshold: 0.3, // Adjust based on desired fuzziness
    };
    const fuse = new Fuse(potentialNotes, options);
    notes = fuse.search(search).map((result) => result.item);
  }

  // Paginate the results
  const total = notes.length;
  notes = notes.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  const count = await Note.countDocuments(query);

  return {
    notes,
    totalPages: Math.ceil(count / limitNum),
    currentPage: pageNum,
  };
};

exports.updateNote = async (noteId, userId, updates) => {
  const note = await Note.findOne({
    _id: noteId,
    user: userId,
    deletedAt: null,
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
    deletedAt: null,
  });
  if (!note) {
    throw new Error("Note not found");
  }
  note.deletedAt = new Date();
  await note.save();
  return note;
};

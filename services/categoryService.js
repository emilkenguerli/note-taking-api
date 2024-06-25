const Category = require("../models/Category");
const Note = require("../models/Note");

exports.createCategory = async (data) => {
  const category = new Category(data);
  await category.save();
  return category;
};

exports.getCategories = async (page, limit) => {
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  const categories = await Category.find({ deletedAt: null })
    .limit(limitNum)
    .skip((pageNum - 1) * limitNum)
    .exec();

  const count = await Category.countDocuments({ deletedAt: null });

  return {
    categories,
    totalPages: Math.ceil(count / limitNum),
    currentPage: pageNum,
  };
};

exports.updateCategory = async (id, updates) => {
  const category = await Category.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { ...updates, updatedAt: Date.now() },
    { new: true }
  );

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

exports.deleteCategory = async (id) => {
  const notes = await Note.find({ category: id });
  if (notes.length > 0) {
    throw new Error("Cannot delete category with assigned notes");
  }

  const category = await Category.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: Date.now() },
    { new: true }
  );

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

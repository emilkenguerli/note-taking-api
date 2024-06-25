const Category = require("../models/Category");

exports.createCategory = async (categoryData, userId) => {
  const category = new Category({
    ...categoryData,
    createdBy: userId,
  });
  await category.save();
  return category;
};

exports.getCategories = async () => {
  const categories = await Category.find({});
  return categories;
};

exports.getCategory = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

exports.updateCategory = async (categoryId, updates) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  Object.keys(updates).forEach(
    (update) => (category[update] = updates[update])
  );
  await category.save();
  return category;
};

exports.deleteCategory = async (categoryId) => {
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

const categoryService = require("../services/categoryService");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await categoryService.getCategory(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const categories = await categoryService.getCategories(page, limit);
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};

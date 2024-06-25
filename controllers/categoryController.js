const categoryService = require("../services/categoryService");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(
      req.body,
      req.user._id
    );
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
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

exports.updateCategory = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

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
    const category = await categoryService.deleteCategory(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

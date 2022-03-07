const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      status: "Category created!",
      category,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      status: "All categories listed",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "Categories not listed",
      error,
    });
  }
};

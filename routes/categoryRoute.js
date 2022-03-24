const express = require('express');
const CategoryController = require('../controllers/categoryController');

const router = express.Router();

router.route("/").post(CategoryController.createCategory)
                 .get(CategoryController.getAllCategories);

router.route("/:id").delete(CategoryController.deleteCategory);

module.exports = router
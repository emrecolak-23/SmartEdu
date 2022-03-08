const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);

  try {
    res.status(201).redirect('/course');
  } catch (error) {
    res.status(400).json({
      status: "Course not created",
      error,
    });
  }
};

exports.getAllCourse = async (req, res) => {

  try {

    const categorySlug = req.query.categories;
    const category = await Category.findOne({slug:categorySlug});

    let filter = {};

    if (categorySlug) {
      filter = {category:category._id}
    }

    const courses = await Course.find(filter).sort("-createdAt");
    const categories = await Category.find()
    res.status(200).render("courses", {
      page_name: "course",
      courses,
      categories
    });
  } catch (err) {
    res.status(400).json({
      status: "Something went wrong",
      err,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug:req.params.slug});

    res.status(200).render("course-single", {
      page_name: "course-single",
      course,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

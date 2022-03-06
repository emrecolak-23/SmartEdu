const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);

  try {
    res.status(201).json({
      status: "Course successfuly created",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "Course not created",
      error,
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find().sort("-createdAt");
    res.status(200).render("courses", {
      page_name: "course",
      courses,
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

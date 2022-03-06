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
    const courses = await Course.find().sort('-createdAt');
    res.status(200).render("courses",{
      page_name: "course",
      courses
    })
  } catch (err) {
    res.status(400).json({
      status: "Something went wrong",
      err
    });
  }
};

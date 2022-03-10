const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  
  try {
  
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID
    });

    req.flash("success", `${course.name} is successfully created`)
    res.status(201).redirect('/course');
  } catch (error) {
    req.flash("error", "Something went wrong!")
    res.status(400).redirect('/course');
  }
};

exports.getAllCourse = async (req, res) => {

  try {

    const categorySlug = req.query.categories;
    const category = await Category.findOne({slug:categorySlug});

    const query = req.query.search

    let filter = {};

    if (categorySlug) {
      filter = {category:category._id}
    }

    if (query) {
      filter = {name:query}
    }

    if (!query && !categorySlug) {
      filter.name = "";
      filter.category = null
    }

    const courses = await Course.find({
      $or: [
        {name: {$regex: ".*" + filter.name + ".*", $options:'i'}},
        {category: filter.category}
      ]
    }).sort("-createdAt").populate('user');
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

    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({slug:req.params.slug}).populate('user');
    const categories = await Category.find()

    res.status(200).render("course-single", {
      page_name: "course-single",
      course,
      user,
      categories
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.enrollCourse = async (req,res) => {

  try {
    const user = await User.findById(req.session.userID)
  
    await user.courses.push(req.body.course_id);
    await user.save();

    res.status(201).redirect("/user/dashboard");
  } catch(error) {
    res.status(400).json({
      status: "Not enrolled to this course",
      error
    })
  }

}

exports.releaseCourse = async (req, res) => {

  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({_id:req.body.course_id});
    user.save();
    res.status(200).redirect('/user/dashboard')
  } catch(error) {
    res.status(400).json({
      status: "You cannot delete this course",
      error
    })
  }
}

exports.deleteCourse = async (req, res) => {

  try {

    const course = await Course.findOneAndRemove({slug:req.params.slug});
    req.flash("error", `${course.name} course is removed`);
    res.status(200).redirect('/user/dashboard');

  } catch(error) {
    res.status(400).json({
      status: "Course not deleted",
      error
    })

  }

}
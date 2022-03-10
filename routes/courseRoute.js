const express = require('express');
const CourseController = require('../controllers/courseController');
const RoleMiddlewares = require('../middlewares/roleMiddlewares');
const Course = require('../models/Course');

const router = express.Router();

router.route('/').post(RoleMiddlewares(["teacher","admin"]),CourseController.createCourse).get(CourseController.getAllCourse)

router.route('/:slug').get(CourseController.getCourse);

router.route('/enroll').post(CourseController.enrollCourse);

router.route('/release').post(CourseController.releaseCourse);

router.route('/:slug').delete(CourseController.deleteCourse);

module.exports = router;
const express = require('express');
const CourseController = require('../controllers/courseController');
const RoleMiddlewares = require('../middlewares/roleMiddlewares');

const router = express.Router();

router.route('/').post(RoleMiddlewares(["teacher","admin"]),CourseController.createCourse).get(CourseController.getAllCourse)

router.route('/:slug').get(CourseController.getCourse);

router.route('/enroll').post(CourseController.enrollCourse);

module.exports = router;
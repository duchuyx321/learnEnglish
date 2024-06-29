const express = require('express');
const router = express.Router();

const uploadFileMiddleware = require('../app/middleware/uploadMiddleware');
const CourseController = require('../app/controllers/CourseController');

router.get('/store', CourseController.courseStore);
router.post(
    '/create',
    uploadFileMiddleware.single('image'),
    CourseController.create,
);
router.get('/:slug', CourseController.lessonCourse);

module.exports = router;

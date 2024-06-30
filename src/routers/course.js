const express = require('express');
const router = express.Router();

const uploadFileMiddleware = require('../app/middleware/uploadMiddleware');
const CourseController = require('../app/controllers/CourseController');

router.get('/store', CourseController.courseStore);
router.get('/:slug/:id_lesson', CourseController.ContentLesson);
router.get('/:slug', CourseController.lessonCourse);
router.post(
    '/create',
    uploadFileMiddleware.single('image'),
    CourseController.create,
);

module.exports = router;

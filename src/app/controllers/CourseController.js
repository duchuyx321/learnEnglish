const Courses = require('../module/Courses');
const Lessons = require('../module/Lesson');

class CourseController {
    //[GET] /course/store
    async courseStore(req, res, next) {
        try {
            const course = await Courses.find();
            res.render('courses/store', { course });
        } catch (err) {
            res.status(500).json({ message: err, next });
        }
    }

    // [GET] /course/:slug?id=:_id
    async lessonCourse(req, res, next) {
        try {
            const lesson = await Lessons.findOne({ id: req.query.id });
            res.json(lesson);
        } catch (err) {
            res.status(404).json({ message: err, next });
        }
    }
    // [POST] /course/create
    async create(req, res, next) {
        try {
            if (!req.file) {
                res.status(400).json({ message: 'not upload img' });
            }
            const fileData = req.file.path;
            req.body.image = fileData;

            const small = new Courses(req.body);
            await small.save();

            res.status(200).json(req.body);
        } catch (error) {
            console.error('Error uploading file:', error);
            if (req.file) {
            }
            res.status(500).json({ message: 'Internal server error', next });
        }
    }
}

module.exports = new CourseController();

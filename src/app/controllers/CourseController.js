const Courses = require('../module/Courses');
const cloudinary = require('cloudinary').v2;

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

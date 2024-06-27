const Courses = require('../module/Courses');
const { multipliedMongooseToObject } = require('../../util/mongoose');
class MeControllers {
    // [GET] /me/stored/courses
    async storedCourse(req, res, next) {
        try {
            const instance = await Courses.find();
            const course = multipliedMongooseToObject(instance);

            res.json({ course });
        } catch (err) {
            res.json(err);
        }
    }
}

module.exports = new MeControllers();

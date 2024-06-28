const Courses = require('../module/Courses');
const { multipliedMongooseToObject } = require('../../util/mongoose');
class HomeController {
    // [GET] --- /
    async index(req, res, next) {
        try {
            const instance = await Courses.find();
            const course = multipliedMongooseToObject(instance);
            res.render('home', { course });
            // res.json({ course });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new HomeController();

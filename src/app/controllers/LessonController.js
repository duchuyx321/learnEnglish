const Lesson = require('../module/Lesson');

class LessonController {
    // [POST] ---/lesson/create
    async create(req, res, next) {
        try {
            const lesson = new Lesson({
                name: req.body.name,
                description: req.body.description,
                contents: req.body.contents,
            });
            await lesson.save();

            res.status(200).json({ message: 'create lesson successfully' });
            // res.status(200).json(req.body);
        } catch (err) {
            res.status(500).json({ message: err.message, next });
        }
    }
}

module.exports = new LessonController();

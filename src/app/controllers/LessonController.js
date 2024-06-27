const Lesson = require('../module/Lesson');

class LessonController {
    // [POST] ---/lesson/create
    async create(req, res, next) {
        try {
            const lesson = await new Lesson(req.body);
            await lesson.save();

            res.status(200).json({ message: 'create lesson successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message, next });
        }
    }
}

module.exports = new LessonController();

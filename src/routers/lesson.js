const express = require('express');
const router = express.Router();

const LessonController = require('../app/controllers/LessonController');

router.post('/create', LessonController.create);

module.exports = router;

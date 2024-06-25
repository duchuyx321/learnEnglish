const express = require('express');
const router = express.Router();

const MeControllers = require('../app/controllers/MeController');

router.get('/stored/courses', MeControllers.storedCourse);

module.exports = router;

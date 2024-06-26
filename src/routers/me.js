const express = require('express');
const router = express.Router();
const { veryToken } = require('../app/middleware/JWTmiddlewate');
const MeControllers = require('../app/controllers/MeController');

router.get('/stored/courses', veryToken, MeControllers.storedCourse);

module.exports = router;

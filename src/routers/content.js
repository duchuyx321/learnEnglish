const express = require('express');
const router = express.Router();

const contentController = require('../app/controllers/contentController');

router.post('/create', contentController.create);

module.exports = router;

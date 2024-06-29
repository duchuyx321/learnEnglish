const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController');
const uploadMiddleware = require("../app/middleware/uploadMiddleware");

router.get('/post', AuthController.post);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.refresh);
router.post('/register',uploadMiddleware.single("image"), AuthController.register);

module.exports = router;

const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// @desc Register a new user with form
// @route POST /api/v1/auth/register
router.post('/register', userController.register);

module.exports = router;

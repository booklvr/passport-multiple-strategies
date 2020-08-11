const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewsController.getLanding);

router.get('/login', viewsController.getLoginForm);

router.get('/register', viewsController.getRegisterForm);

router.get('/profile', authController.ensureAuth, viewsController.getProfile);

module.exports = router;

const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login_post);

router.post('/signup', authController.signup_post);

router.get('/get-user', authController.get_user_get);

router.get('/logout', authController.logout_get)

module.exports = router;

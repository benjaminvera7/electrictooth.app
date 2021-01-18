const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.POST('/signin', authController.signin);
router.POST('/signup', authController.signup);

module.exports = router;

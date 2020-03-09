const express = require('express');
const router = express.Router();

require('../services/passport');
const passport = require('passport');

const authController = require('../controllers/auth');

//protects routes by verifying user token
const requireAuth = passport.authenticate('jwt', { session: false });

//protects user token generation by verifying user exists
const requireSignin = passport.authenticate('local', { session: false });

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);

module.exports = router;

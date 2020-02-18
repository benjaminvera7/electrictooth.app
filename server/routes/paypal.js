const express = require('express');
const router = express.Router();

require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const paypalController = require('../controllers/paypal');

router.post('/request', paypalController.requestPayment);
router.get('/return', paypalController.returnPayment);

module.exports = router;

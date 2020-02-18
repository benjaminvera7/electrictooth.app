const express = require('express');
const router = express.Router();

require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

//protects routes by verifying user token
const orderController = require('../controllers/order');

router.get('/:orderId', requireAuth, orderController.getOrder);

module.exports = router;

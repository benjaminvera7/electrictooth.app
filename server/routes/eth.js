const express = require('express');
const router = express.Router();

require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const ethController = require('../controllers/eth');

router.post('/request', requireAuth, ethController.requestPayment);
router.get('/return/:hash/:orderId', requireAuth, ethController.returnPayment);

module.exports = router;

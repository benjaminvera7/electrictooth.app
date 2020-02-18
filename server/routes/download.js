const express = require('express');
const router = express.Router();

require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

//protects routes by verifying user token
const downloadController = require('../controllers/download');

router.get('/:orderId/:product_id', requireAuth, downloadController.download);

module.exports = router;

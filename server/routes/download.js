const express = require('express');
const router = express.Router();

require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

//protects routes by verifying user token
const downloadController = require('../controllers/download');

router.get(
  '/order/:orderId/:product_id',
  requireAuth,
  downloadController.downloadFromOrder,
);
//router.get('/:product_id', requireAuth, downloadController.downloadFromProfile);

module.exports = router;

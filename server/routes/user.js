const express = require('express');
const router = express.Router();
require('../services/passport');
const passport = require('passport');

const userController = require('../controllers/user');

//protects routes by verifying user token
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, userController.getUser);
router.post('/cart/add/:product_id', requireAuth, userController.addToCart);
router.post(
  '/cart/remove/:product_id',
  requireAuth,
  userController.removeFromCart,
);

router.post(
  '/playlist/add/:product_id',
  requireAuth,
  userController.addToPlaylist,
);

router.post(
  '/playlist/remove/:product_id',
  requireAuth,
  userController.removeFromPlaylist,
);

router.get('/coins', requireAuth, userController.getCoins);
router.post('/coins/exchange', requireAuth, userController.exchangeCoins);

module.exports = router;

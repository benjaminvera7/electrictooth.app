const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.GET('/', userController.getUser);

router.POST('/cart/:id', userController.addToCart);
router.DELETE('/cart/:id', userController.removeFromCart);

router.POST('/playlist/:id', userController.addToPlaylist);
router.DELETE('/playlist/:id', userController.removeTrackFromPlaylist);

router.GET('/coins', userController.getCoins);

module.exports = router;

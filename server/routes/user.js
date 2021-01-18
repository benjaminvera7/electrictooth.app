const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getUser);

router.post('/cart/:id', userController.addToCart);
router.delete('/cart/:id', userController.removeFromCart);

router.post('/playlist/:id', userController.addToPlaylist);
router.delete('/playlist/:id', userController.removeTrackFromPlaylist);

// router.get('/coins', userController.getCoins);

module.exports = router;

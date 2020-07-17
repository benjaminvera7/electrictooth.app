const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getUser);
router.post('/cart/add/:product_id', userController.addToCart);
router.post('/cart/remove/:product_id', userController.removeFromCart);
router.post('/playlist/add/:product_id', userController.addToPlaylist,);
router.post('/playlist/remove/:product_id', userController.removeFromPlaylist,);
router.get('/coins', userController.getCoins);
router.post('/coins/exchange', userController.exchangeCoins);

module.exports = router;

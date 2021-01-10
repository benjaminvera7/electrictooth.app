const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getUser);

router.post('/cart/:id', userController.addToCart);
router.delete('/cart/:id', userController.removeFromCart);

// router.post('/playlist/add/:product_id', userController.addToPlaylist);
// router.delete('/playlist/remove/:product_id', userController.removeFromPlaylist);

// router.get('/coins', userController.getCoins);

module.exports = router;

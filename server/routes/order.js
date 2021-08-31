const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.get('/orders', orderController.getUserOrders);
router.get('/:orderId', orderController.getOrder);

module.exports = router;

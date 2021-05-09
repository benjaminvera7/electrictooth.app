const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypal');
const checkCustomerAuth = require('../util/checkCustomerAuth');

router.post('/request', checkCustomerAuth, paypalController.requestPayment);
router.get('/return', paypalController.returnPayment);

module.exports = router;

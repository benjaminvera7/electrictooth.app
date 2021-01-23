const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypal');

router.post('/request', paypalController.requestPayment);
router.get('/return', paypalController.returnPayment);

module.exports = router;

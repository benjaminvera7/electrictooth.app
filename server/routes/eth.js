const express = require('express');
const router = express.Router();
const ethController = require('../controllers/eth');

router.post('/request', ethController.requestPayment);
router.get('/return/:hash/:orderId', ethController.returnPayment);

module.exports = router;

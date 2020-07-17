const express = require('express');
const router = express.Router();

const downloadController = require('../controllers/download');

router.get('/order/:orderId/:product_id', downloadController.downloadFromOrder);
router.get('/product/:product_id', downloadController.downloadFromProfile);

module.exports = router;

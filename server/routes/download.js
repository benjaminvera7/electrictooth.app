const express = require('express');
const router = express.Router();

const downloadController = require('../controllers/download');

router.get('/order/:orderId/:id', downloadController.downloadFromOrder);
router.get('/:id', downloadController.downloadFromProfile);

module.exports = router;

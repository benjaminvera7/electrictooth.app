const express = require('express');
const router = express.Router();
const resetController = require('../controllers/reset');

router.post('/', resetController.resetPassword);
router.post('/:userId/:token', resetController.storePassword);

module.exports = router;

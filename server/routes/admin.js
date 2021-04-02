const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.post('/signin', adminController.signin);

module.exports = router;

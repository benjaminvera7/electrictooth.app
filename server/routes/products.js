const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

router.get('/albums', productsController.getAlbums);
router.get('/albums/:productId', productsController.getAlbumByProductId);

module.exports = router;

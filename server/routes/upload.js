const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload');

router.post('/edit_album', uploadController.editAlbum);
router.post('/edit_track', uploadController.editTrack);
router.post('/edit_artist', uploadController.editArtist);
router.post('/edit_product', uploadController.editProduct);

module.exports = router;

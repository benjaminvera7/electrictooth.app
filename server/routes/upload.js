const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload');

router.POST('/edit_album', uploadController.editAlbum);
router.POST('/edit_track', uploadController.editTrack);
router.POST('/edit_artist', uploadController.editArtist);

module.exports = router;

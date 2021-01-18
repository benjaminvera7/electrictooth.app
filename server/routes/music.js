const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music');

router.GET('/', musicController.getMusic);
router.GET('/artist', musicController.getArtist);
router.GET('/artists', musicController.getArtists);

module.exports = router;

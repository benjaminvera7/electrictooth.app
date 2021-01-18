const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music');

router.get('/', musicController.getMusic);
router.get('/artist', musicController.getArtist);
router.get('/artists', musicController.getArtists);

module.exports = router;

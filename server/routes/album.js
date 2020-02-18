const express = require("express");
const router = express.Router();

const albumController = require("../controllers/album");

router.get("/:page", albumController.getAlbums);
router.get("/album/:albumId", albumController.getAlbum);

module.exports = router;
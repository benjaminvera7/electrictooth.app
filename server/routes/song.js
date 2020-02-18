const express = require("express");
const router = express.Router();

const songController = require("../controllers/song");

router.get("/:songId", songController.getSong);

module.exports = router;
const express = require("express");
const router = express.Router();
const streamController = require("../controllers/stream");

router.get("/:songId", streamController.stream);

module.exports = router;
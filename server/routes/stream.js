const express = require("express");
const router = express.Router();

require('../services/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

const streamController = require("../controllers/stream");

router.get("/:songId", requireAuth, streamController.stream);

module.exports = router;
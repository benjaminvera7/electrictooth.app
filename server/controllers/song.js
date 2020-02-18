const Song = require("../models/song");

async function getSong(req, res, next) {
  const songId = req.params.songId;
  try {
    const song = await Song.findById({_id: songId})

    if (!song) {
      const error = new Error("Could not find song.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Song fetched.", song: song });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

module.exports = {
  getSong
};

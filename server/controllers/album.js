const Album = require("../models/album");

//this is needed to use populate()
require("../models/song");
require("../models/artist");

async function getAlbums(req, res, next) {
  const currentPage = req.query.page || 1;
  const perPage = 6;
  try {
    const totalAlbums = await Album.find().countDocuments();
    const albums = await Album.find()
      .populate("songs")
      .populate("artist")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched Albums successfully.",
      albums: albums,
      totalAlbums: totalAlbums
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

async function getAlbum(req, res, next) {
  const albumId = req.params.albumId;
  try {
    const album = await Album.findById(albumId)
      .populate("songs")
      .populate("artist");
    if (!album) {
      const error = new Error("Could not find album.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Album fetched.", album: album });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

module.exports = {
  getAlbums,
  getAlbum
};

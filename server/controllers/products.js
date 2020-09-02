const dbConnection = require('../services/database');
const errorHandler = require('../util/errorHandler');

async function getAlbums(req, res) {
  try {
    const albums = await dbConnection.getAlbums();

    res.status(200).json(albums);
  } catch (err) {
    errorHandler(err, req, res);
  }
}

async function getFullAlbumByProductId(req, res) {
  const productId = req.params.productId;

  try {
    const album = await dbConnection.getFullAlbumByProductId(productId);
    res.status(200).json(album);
  } catch (err) {
    errorHandler(err, req, res);
  }
}

module.exports = {
  getAlbums,
  getFullAlbumByProductId,
};

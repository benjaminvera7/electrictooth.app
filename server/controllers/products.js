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

async function getAlbumByProductId(req, res) {
  const productId = req.params.productId;

  try {
    const album = await dbConnection.getAlbumByProductId(productId);
    res.status(200).json(album);
  } catch (err) {
    errorHandler(err, req, res);
  }
}

module.exports = {
  getAlbums,
  getAlbumByProductId,
};

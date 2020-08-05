const dbConnection = require('../services/database');
const errorHandler = require('../util/errorHandler');

async function getAlbums(req, res) {
  const currentPage = req.query.page || 1;

  try {
    const albums = await dbConnection.getAlbumsPaginationPage(currentPage);

    res.status(200).json(albums);
  } catch (err) {
    errorHandler(err, req, res);
  }
}

async function getAlbum(req, res) {
  const productId = req.params.id;
  try {
    const album = await dbConnection.getAlbumByProductId(productId);

    res.status(200).json(album);
  } catch (err) {
    errorHandler(err, req, res);
  }
}

module.exports = {
  getAlbums,
  getAlbum,
};

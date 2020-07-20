const dbConnection = require('../services/database');

async function getAlbums(req, res, next) {
  const currentPage = req.query.page || 1;
  
  try {
    const totalAlbums = await dbConnection.getAlbumCount();
    const albums = await dbConnection.getAlbumsPaginationPage(currentPage)

    res.status(200).json({
      message: 'Fetched Albums successfully.',
      albums: albums,
      totalAlbums: totalAlbums,
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

async function getAlbum(req, res, next) {
  const productId = req.params.productId;
  try {
    const album = await dbConnection.getAlbumByProductId(productId)
    if (!album) {
      const error = new Error('Could not find album.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Album fetched.', album: album });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

module.exports = {
  getAlbums,
  getAlbum,
};

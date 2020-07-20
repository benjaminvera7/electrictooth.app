const dbConnection = require('../services/database');

async function getSong(req, res, next) {
  const productId = req.params.productId;

  try {
    const song = await dbConnection.getSongByProductId(productId);

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

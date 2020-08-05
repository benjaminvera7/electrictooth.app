const dbConnection = require('../services/database');
const errorHandler = require('../util/errorHandler');

async function getSong(req, res) {
  const productId = req.params.id;

  try {
    const song = await dbConnection.getSongByProductId(productId);

    res.status(200).json(song);
  } catch (err) {
    errorHandler(err, req, res);
  }
}

module.exports = {
  getSong,
};

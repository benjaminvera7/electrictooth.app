const dbConnection = require('../services/database');

async function getMusic(req, res) {
  const albums = await dbConnection.getAlbumsPaginationPage(1);
  res.status(200).json(albums);
}

module.exports = {
  getMusic,
};

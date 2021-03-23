const dbConnection = require('../services/database');

async function getMusic(req, res) {
  const data = await dbConnection.getData();
  res.status(200).json(data);
}

async function getArtists(req, res) {
  const artists = await dbConnection.getArtists();
  res.status(200).json(artists);
}

async function getArtist(req, res) {
  const artist = await dbConnection.getArtist(req.query.id);
  res.status(200).json(artist);
}

module.exports = {
  getMusic,
  getArtists,
  getArtist,
};

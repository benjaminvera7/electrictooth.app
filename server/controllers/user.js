const dbConnection = require('../services/database');

function getUser(req, res) {
  res.status(200).json(req.user);
}

module.exports = {
  getUser,
};

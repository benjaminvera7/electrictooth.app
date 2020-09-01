const dbConnection = require('../services/database');
const errorHandler = require('../util/errorHandler');

async function getProducts(req, res) {
  try {
    const products = await dbConnection.getProducts();

    res.status(200).json(products);
  } catch (err) {
    errorHandler(err, req, res);
  }
}

module.exports = {
  getProducts,
};

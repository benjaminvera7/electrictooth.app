const dbConnection = require('../services/database');

async function getOrder(req, res) {
  const orderId = req.params.orderId;

  if (!orderId) {
    return res.status(422).send({ error: 'No orderId found in query' });
  }

  const order = await dbConnection.getOrderById(orderId);

  if (!order) {
    return res.status(422).send({ error: 'No Order found' });
  }

  res.status(200).json({
    message: 'Order fetched successfully.',
    items: order.cart.items,
  });
}

module.exports = {
  getOrder,
};

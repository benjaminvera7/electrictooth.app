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

  res.status(200).json(order);
}

async function getUserOrders(req, res) {
  const userId = req.user._id

  if (!userId) {
    return res.status(422).send({ error: 'User not found' });
  }

  const order = await dbConnection.getUserOrders(userId)

  if (!order) {
    return res.status(422).send({ error: 'No Orders found' });
  }

  res.status(200).json(order);
}


module.exports = {
  getOrder,
  getUserOrders
};

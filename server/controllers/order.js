const path = require('path');
const User = require('../models/user');
const Album = require('../models/album');
const Order = require('../models/order');
const fs = require('fs');

async function getOrder(req, res, next) {
  let orderId = req.params.orderId;

  if (!orderId) {
    return res.status(422).send({ error: 'No orderId found in query' });
  }

  order = await Order.findById({ _id: orderId }).exec();

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

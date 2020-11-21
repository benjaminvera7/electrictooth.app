const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  status: String,
  cart_id: { type: Schema.Types.ObjectId, ref: 'Carts' },
  type: String,
  hash: String,
  date: String,
});

const Orders = mongoose.model('Orders', OrdersSchema);

module.exports = Orders;

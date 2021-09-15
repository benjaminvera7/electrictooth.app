const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  cart: Object,
  status: String,
  currency: String,
  hash: String,
  updated_at: Date,
  shippingAddress: Object
});

const Orders = mongoose.model('Orders', OrdersSchema);

module.exports = Orders;

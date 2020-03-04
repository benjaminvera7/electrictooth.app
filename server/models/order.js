const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  status: String,
  cart: Object,
  type: String,
  hash: String,
});

module.exports = mongoose.model('Order', orderSchema);

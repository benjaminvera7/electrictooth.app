const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinSchema = new Schema({
  product_id: String,
  amount: Number,
  art_url: String,
  price: Number,
  type: String,
});

const Coin = mongoose.model('Coin', coinSchema);
module.exports = Coin;

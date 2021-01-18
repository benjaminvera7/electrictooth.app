const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinsSchema = new Schema({
  amount: Number,
  art_name: String,
  price: Number,
  type: String,
});

const Coins = mongoose.model('Coins', CoinsSchema);

module.exports = Coins;

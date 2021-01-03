const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartsSchema = new Schema({
  cart: Object,
});

const Carts = mongoose.model('Carts', CartsSchema);

module.exports = Carts;

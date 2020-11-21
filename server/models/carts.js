const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  cart: Object,
});

const Carts = mongoose.model('Carts', CartsSchema);

module.exports = Carts;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*  TYPE */
//'single', 'album', 'coin', 'physical'

const productsSchema = new Schema({
  type: String,
  price: Number,
  quantity: Number,
  img_url: String,
  product_id: String,
  stream_url: String,
  description: String,
  stream_price: Number,
  download_url: String,
  artist_name: String,
  album_name: String,
  song_name: String,
  position: Number,
  income: Number,
  plays: Number,
  songs: Array,
});

const Products = mongoose.model('products', productsSchema);
module.exports = Products;

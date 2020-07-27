const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  product_id: String,
  artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
  artist_name: String,
  album_name: String,
  description: String,
  art_url: String,
  download_price: Number,
  download_url: String,
  type: String,
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
});

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;

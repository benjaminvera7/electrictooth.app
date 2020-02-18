const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  product_id: String,
  artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
  artist_name: String,
  album: { type: Schema.Types.ObjectId, ref: 'Album' },
  album_name: String,
  song_name: String,
  position: Number,
  stream_url: String,
  art_url: String,
  download_price: Number,
  coin_price: Number,
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;

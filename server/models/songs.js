const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songsSchema = new Schema({
  artist_name: String,
  album: { type: Schema.Types.ObjectId, ref: 'Products' },
  artist_id: { type: Schema.Types.ObjectId, ref: 'Artists' },
  album_name: String,
  song_name: String,
  position: Number,
  stream_url: String,
  art_url: String,
  download_price: Number,
  coin_price: Number,
  income: Number,
  plays: Number,
});

const Songs = mongoose.model('Songs', songsSchema);
module.exports = Songs;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TracksSchema = new Schema({
  album_id: { type: Schema.Types.ObjectId, ref: 'Albums' },
  artist_name: String,
  album_name: String,
  track_name: String,
  position: Number,
  art_url: String,
  art_name: String,
  stream_url: String,
  download_price: Number,
  coin_price: Number,
  plays: Number,
  income: Number,
});

const Tracks = mongoose.model('Tracks', TracksSchema);

module.exports = Tracks;

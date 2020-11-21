const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumsSchema = new Schema({
  artist_name: String,
  album_name: String,
  description: String,
  art_url: String,
  download_price: Number,
  tracks: [{ type: Schema.Types.ObjectId, ref: 'Tracks' }],
});

const Albums = mongoose.model('Albums', AlbumsSchema);

module.exports = Albums;
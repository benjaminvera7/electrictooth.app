const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistsSchema = new Schema({
  artist_name: String,
  artist_bio: String,
  artist_img: String,
  created_at: Date,
  facebook: String,
  twitter: String,
  soundcloud: String,
  bandcamp: String,
  tiktok: String,
  instagram: String,
  spotify: String,
  applemusic: String,
  albums: [{ type: Schema.Types.ObjectId, ref: 'Albums' }],
});

const Artists = mongoose.model('Artists', ArtistsSchema);

module.exports = Artists;

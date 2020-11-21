const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  playlist_name: String,
  tracks: [{ type: Schema.Types.ObjectId, ref: 'Tracks' }],
});

const Playlists = mongoose.model('Playlists', PlaylistsSchema);

module.exports = Playlists;

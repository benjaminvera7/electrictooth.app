const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistsSchema = new Schema({
  name: String,
  albums: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
});

const Artists = mongoose.model('Artists', artistsSchema);
module.exports = Artists;

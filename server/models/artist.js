const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  albums: [{ type: Schema.Types.ObjectId, ref: "Album" }]
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReleaseSchema = new Schema({
  release: String,
});

const Release = mongoose.model('Release', ReleaseSchema);

module.exports = Release;

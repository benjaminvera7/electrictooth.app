const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
  username: String,
  albumCollection: Array,
  playlist: Array,
  stream: Array,
  cart: Object,
  coins: Number,
  reset_password_token: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

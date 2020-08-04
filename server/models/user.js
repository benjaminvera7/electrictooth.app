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

UserSchema.methods.getCart = function() {
  return this.cart;
};

UserSchema.methods.getPlaylist = function() {
  return this.playlist;
};

UserSchema.methods.updatePlaylist = function(playlist) {
  this.playlist = playlist;
  return this.playlist;
};

UserSchema.methods.updateCart = function(cart) {
  this.cart = cart;
  return this.cart;
};

UserSchema.methods.clearCart = function() {
  this.cart = { items: [], total: 0 };
  return this.cart;
};

UserSchema.methods.addToAlbumCollection = function(albumArray) {
  this.albumCollection = [...this.albumCollection, ...albumArray];
  return this.albumCollection;
};

UserSchema.methods.getAlbumCollection = function() {
  return this.albumCollection;
};

UserSchema.methods.getCoins = function() {
  return this.coins;
};

UserSchema.methods.exchangeCoins = function(type, amount) {
  switch (type) {
    case 'SUBTRACT':
      this.coins = this.coins - amount;
      break;
    case 'ADD':
      this.coins = this.coins + amount;
      break;
    default:
      this.coins;
  }
  return this.coins;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

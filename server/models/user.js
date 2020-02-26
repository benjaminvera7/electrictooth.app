const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
  username: String,
  albumCollection: Array,
  playlist: [],
  cart: Object,
  coins: Number,
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

function encrypt(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
}

function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

UserSchema.methods.encrypt = encrypt;
UserSchema.methods.comparePassword = comparePassword;

const User = mongoose.model('User', UserSchema);

module.exports = User;

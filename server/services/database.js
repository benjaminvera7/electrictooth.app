const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');

// const User = require('../models/user');
// const Order = require('../models/order');
// const Products = require('../models/products');

class DatabaseService {
  constructor() {
    this.db = null;
    this.configure();
    this.connect();
  }

  configure() {
    this.db = mongoose.connection.openUri(config.dbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    mongoose.set('useFindAndModify', false);
  }

  connect() {
    this.db.on('error', () => console.error.bind(console, 'db error'));
    this.db.once('open', () => console.log('ET3-Database Connection ok!'));
  }
}

const dbConnection = new DatabaseService();

module.exports = dbConnection;

/*
  async getAlbumCount() {
    const count = await Album.find().countDocuments();
    return count;
  }

  async getAlbumsPaginationPage(currentPage) {
    const perPage = 6;
    const albums = await Album.find()
      .populate('songs')
      .populate('artist')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return albums;
  }

  async getAlbums() {
    const albums = Products.find({ type: 'album' });
    return albums;
  }

  async getProduct(productId) {
    const product = await Products.findOne({ product_id: productId });
    return product;
  }

  async getFullAlbumByProductId(productId) {
    const album = await Products.find({ product_id: new RegExp(productId) });
    return album;
  }

  async getAlbumByProductId(productId) {
    const album = await Products.findOne({ product_id: new RegExp(productId), type: 'album' });
    return album;
  }

  async getSongByProductId(productId) {
    const song = await Products.findOne({ product_id: productId, type: 'single' });
    return song;
  }

  async getSongById(id) {
    const song = await Products.findById(id);
    return song;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }

  async getUserByResetToken(resetToken) {
    const user = await User.findOne({ reset_password_token: resetToken });
    return user;
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    return user;
  }

  async updateUserResetToken(id, token) {
    await User.findOneAndUpdate({ _id: id }, { reset_password_token: token });
    return;
  }

  async createOrder(user, type) {
    const order = new Order({
      userId: user._id,
      status: 'PENDING',
      cart: user.cart,
      type: type,
    });

    return await order.save();
  }

  async getOrderById(orderId) {
    const order = await Order.findById({ _id: orderId });
    return order;
  }

  async updateOrderStatusById(orderId, status, txHash = '') {
    return await Order.findOneAndUpdate({ _id: orderId }, { status: status }, { hash: txHash });
  }

  async subtractCoin(user) {
    user.coins = user.coins - 1;
    return await user.save();
  }

  async getCoinByProductId(productId) {
    const coin = await Products.findOne({ product_id: productId, type: 'coin' });
    return coin;
  }

  async addCoin(user, amount) {
    user.coins = user.coins + amount;
    return await user.save();
  }

  async addAlbumToCollection(user, albums) {
    user.albumCollection = [...user.albumCollection, ...albums];
    return await user.save();
  }

  async clearCart(user) {
    user.cart = { items: [], total: 0 };
    return await user.save();
  }

  async updateCart(user, cart) {
    user.cart = cart;
    return await user.save();
  }

  async updatePlaylist(user, playlist) {
    user.playlist = playlist;
    return await user.save();
  }

  async addIncome(song) {
    song.income = song.income + 1;
    return await song.save();
  }

  async addPlay(song) {
    song.plays = song.plays + 1;
    return await song.save();
  }
  */

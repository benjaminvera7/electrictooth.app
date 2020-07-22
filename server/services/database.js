const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');

const Album = require('../models/album');
const Song = require('../models/song');
const User = require('../models/user');
const Order = require('../models/order');

//this is needed to use populate()
require('../models/song');
require('../models/artist');

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

  async getAlbumByProductId(productId) {
    const album = await Album.findOne({ product_id: productId })
      .populate('songs')
      .populate('artist');

    return album;
  }

  async getSongByProductId(productId) {
    const song = await Song.findOne({ product_id: productId });
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
    return await Order.findOneAndUpdate(
      { _id: orderId },
      { status: status },
      { hash: txHash },
    );
  }
}

const dbConnection = new DatabaseService();

module.exports = dbConnection;

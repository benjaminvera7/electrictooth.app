const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');

const Album = require('../models/album');

//this is needed to use populate()
require('../models/song');
require('../models/artist');

class DatabaseService {
  constructor() {
    this.db = null;
    this.init();
  }

  init() {
    this.db = mongoose.connection.openUri(config.dbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    mongoose.set('useFindAndModify', false);
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
}

const dbConnection = new DatabaseService();

module.exports = dbConnection;

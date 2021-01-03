const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');

const Artists = require('../models/artists');
const Albums = require('../models/albums');
const Tracks = require('../models/tracks');
const Users = require('../models/users');
const Carts = require('../models/carts');

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

  async doesArtistExist(artist_name) {
    const artist = await Artists.findOne({ artist_name });
    return Boolean(artist);
  }

  async createArtist(properties) {
    const newArtist = new Artists({
      _id: new mongoose.Types.ObjectId(),
      artist_name: properties.artist_name,
      artist_bio: properties.artist_bio,
      artist_img: properties.artist_img,
      albums: properties.albums,
    });

    return newArtist.save();
  }

  async getArtist(artist_name) {
    return await Artists.findOne({ artist_name });
  }

  async createAlbum(properties) {
    const newAlbum = new Albums({
      _id: new mongoose.Types.ObjectId(),
      artist_name: properties.artist_name,
      album_name: properties.album_name,
      description: properties.description,
      art_url: properties.art_url,
      art_name: properties.art_name,
      download_price: properties.download_price,
      tracks: properties.tracks,
      tags: properties.tags,
      type: 'album',
    });

    return newAlbum.save();
  }

  async createTrack(properties) {
    const newTrack = new Tracks({
      _id: new mongoose.Types.ObjectId(),
      album_id: properties.album_id,
      album_name: properties.album_name,
      track_name: properties.track_name,
      artist_name: properties.artist_name,
      position: properties.position,
      art_url: properties.art_url,
      art_name: properties.art_name,
      stream_url: properties.stream_url,
      coin_price: 1,
      download_price: 1,
      plays: 0,
      income: 0,
      type: 'track',
    });

    return newTrack.save();
  }

  async addAlbumToArtist(artist_id, album_id) {
    const artist = await Artists.findById({ _id: artist_id });
    artist.albums.push(album_id);

    return artist.save();
  }

  async addTracksToAlbum(album_id, tracks) {
    const album = await Albums.findById({ _id: album_id });
    album.tracks = tracks;

    return album.save();
  }

  async getAlbumsPaginationPage(currentPage) {
    const perPage = 6;
    const albums = await Albums.find()
      .populate('tracks')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return albums;
  }

  async getArtists() {
    const artists = await Artists.find({}, 'artist_name _id');

    return artists;
  }

  async getUserByEmail(email) {
    const user = await Users.findOne({ email: email });
    return user;
  }

  async updateArtist(name, prop, value) {
    const artist = Artists.findOneAndUpdate({ artist_name: name }, { [prop]: value });
    return artist;
  }

  async getUserById(userId) {
    const user = await Users.find(userId);
    return user;
  }

  async getTrackById(id) {
    const track = await Tracks.findById({ _id: id });
    return track;
  }

  async getUserCart(id) {
    const cart = await Carts.findById({ _id: id });
    return cart;
  }

  async createUserCart() {
    const newCart = new Carts({
      _id: new mongoose.Types.ObjectId(),
      cart: { items: [], total: 0 },
    });

    return newCart.save();
  }
}

const dbConnection = new DatabaseService();

module.exports = dbConnection;

/*
  async getAlbumCount() {
    const count = await Album.find().countDocuments();
    return count;
  }
  async getArtist(id) {
  const artist = await Artists.findById(id);
    return artist;
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

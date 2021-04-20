const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');

const Artists = require('../models/artists');
const Albums = require('../models/albums');
const Tracks = require('../models/tracks');
const Users = require('../models/users');
const Carts = require('../models/carts');
const Playlists = require('../models/playlists');
const Coins = require('../models/coins');
const Orders = require('../models/orders');
const Products = require('../models/products');

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

  getDate() {
    let utcDate = new Date(Date.now());
    return utcDate.toUTCString();
  }

  async doesArtistExist(artist_name) {
    const artist = await Artists.findOne({ artist_name });
    return Boolean(artist);
  }

  async getArtistDetailByName(artist_name) {
    const artist = await Artists.findOne({ artist_name }).populate({ path: 'albums' }).exec();
    return artist;
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

  async getArtist(artist_id) {
    return await Artists.findById({ _id: artist_id });
  }

  async getArtistByName(artist_name) {
    const artist = await Artists.findOne({ artist_name });
    return artist;
  }

  async createProduct(properties) {
    const newProduct = new Products({
      _id: new mongoose.Types.ObjectId(),
      product_name: properties.product_name,
      description: properties.description,
      art_url: properties.art_url,
      art_name: properties.art_name,
      price: properties.price,
      tags: properties.tags,
      type: 'merch',
      artist_name: properties.artist_name,
      artist: properties.artist,
      quantity: properties.quantity
    });

    return newProduct.save();
  }

  async getProductById(product_id) {
    return await Products.findById({ _id: product_id });
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
      artist: properties.artist,
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

  async getData() {
    const artists = await Artists.find().populate({ path: 'albums', select: '_id art_name album_name' });

    const albums = await Albums.find().populate('tracks');

    const coins = await Coins.find();

    const products = await Products.find();

    return { artists, albums, coins, products };
  }

  async getAlbumsPaginationPage(currentPage) {
    const perPage = 6;
    const albums = await Albums.find()
      .populate('tracks')
      .populate({
        path: 'artist',
        populate: {
          path: 'albums',
          populate: 'tracks',
        },
      })
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
    const artist = await Artists.findOneAndUpdate({ artist_name: name }, { [prop]: value }, { new: true });
    return artist;
  }

  async getUserById(userId) {
    const user = await Users.findById({ _id: userId }).populate({ path: 'cart' }).exec();
    return user;
  }

  async getTrackById(id) {
    const track = await Tracks.findById({ _id: id });
    return track;
  }

  async getAlbumById(id) {
    const album = await Albums.findById({ _id: id });
    return album;
  }

  async getFullAlbumById(id) {
    const album = await Albums.findById({ _id: id }).populate({ path: 'tracks' }).exec();
    return album;
  }

  async getCoinById(id) {
    const coin = await Coins.findById({ _id: id });
    return coin;
  }

  async getUserCart(id) {
    const cart = await Carts.findById({ _id: id });
    return cart;
  }

  async getUserPlaylist(playlist_id) {
    const playlist = await Playlists.findById({ _id: playlist_id })
      .populate({ path: 'tracks', select: '_id artist_name album_name track_name art_url art_name' })
      .exec();
    return playlist;
  }

  async createUserCart() {
    const newCart = new Carts({
      _id: new mongoose.Types.ObjectId(),
      cart: { items: [], total: 0 },
    });

    return newCart.save();
  }

  async createUserPlaylist() {
    const newPlaylist = new Playlists({
      _id: new mongoose.Types.ObjectId(),
      tracks: [],
    });

    return newPlaylist.save();
  }

  async updateUserCart(id, updatedCart) {
    const cart = await Carts.findOneAndUpdate({ _id: id }, { cart: updatedCart }, { new: true });
    return cart;
  }

  async addTrackToPlaylist(playlist_id, track_id) {
    const playlist = await Playlists.findById({ _id: playlist_id });

    playlist.tracks.push(track_id);
    await playlist.save();

    const newPlaylist = await Playlists.findById({ _id: playlist_id })
      .populate({ path: 'tracks', select: '_id artist_name album_name track_name art_url art_name' })
      .exec();

    return newPlaylist;
  }

  async removeTrackFromPlaylist(playlist_id, track_id) {
    const playlist = await Playlists.findById({ _id: playlist_id });

    playlist.tracks = playlist.tracks.filter((t) => t._id.toString() !== track_id);
    await playlist.save();

    const newPlaylist = await Playlists.findById({ _id: playlist_id })
      .populate({ path: 'tracks', select: '_id artist_name album_name track_name art_url art_name' })
      .exec();

    return newPlaylist;
  }

  async updateUserResetToken(id, token) {
    await Users.findOneAndUpdate({ _id: id }, { reset_token: token });
    return;
  }

  async getUserByResetToken(resetToken) {
    const user = await Users.findOne({ reset_token: resetToken });
    return user;
  }

  async subtractCoin(user) {
    user.coins = user.coins - 1;
    return await user.save();
  }

  async addCoin(user, amount) {
    user.coins = user.coins + amount;
    return await user.save();
  }

  async createOrder(userId, cart, currency) {
    const order = new Orders({
      user_id: userId,
      status: 'PENDING',
      cart: cart,
      currency: currency,
      updated_at: this.getDate(),
    });

    return await order.save();
  }

  async updateOrderStatusById(orderId, status) {
    return await Orders.findOneAndUpdate({ _id: orderId }, { status: status }, { new: true });
  }

  async updateOrderShippingAddressById(orderId, shippingAddress) {
    return await Orders.findOneAndUpdate({ _id: orderId }, { shippingAddress: shippingAddress }, { new: true });
  }

  async updateEthOrderStatusById(orderId, status, hash) {
    return await Orders.findOneAndUpdate({ _id: orderId }, { status: status, hash: hash }, { new: true });
  }

  async updateProductQuantityById(id, quantity) {
    return await Products.findOneAndUpdate({ _id: id }, { quantity: quantity }, { new: true });
  }

  async addToLibrary(user, list) {
    user.library = [...user.library, ...list];
    return await user.save();
  }

  async getOrderById(orderId) {
    const order = await Orders.findById({ _id: orderId });
    return order;
  }
}

const dbConnection = new DatabaseService();

module.exports = dbConnection;
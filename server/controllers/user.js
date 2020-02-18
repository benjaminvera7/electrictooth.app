const Album = require('../models/album');
const Coin = require('../models/coin');
const Order = require('../models/order');

async function addToCart(req, res, next) {
  let product_id = req.params.product_id;
  let found = product_id.match(/coin/g);

  if (!!found) {
    let coin;

    try {
      coin = await Coin.findOne({ product_id: req.params.product_id }).exec();
      if (!coin) {
        const error = new Error('Could not find coin.');
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
    let newCart = { items: [], total: 0 };
    let currentCart = req.user.getCart();

    if (currentCart.length === 0) {
      currentCart = newCart;
    }

    let inCart;

    for (let i = 0; i < currentCart.items.length; i++) {
      if (currentCart.items[i].product_id === coin.product_id) {
        inCart = true;
        break;
      }
    }

    if (!inCart) {
      newCart.items.push(...currentCart.items);

      newCart.items.push({
        id: coin._id,
        product_id: coin.product_id,
        amount: coin.amount,
        art_url: coin.art_url,
        price: coin.price,
        quantity: 1,
      });

      newCart.total = currentCart.total + coin.price;

      req.user.updateCart(newCart);
      req.user.save();

      res.status(200).json({ message: 'Album added to cart', user: req.user });
    }
  } else {
    let album;
    try {
      album = await Album.findOne({ product_id: req.params.product_id }).exec();
      if (!album) {
        const error = new Error('Could not find album.');
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      console.log(err);
    }

    let newCart = { items: [], total: 0 };

    let currentCart = req.user.getCart();

    if (currentCart.length === 0) {
      currentCart = newCart;
    }
    let inCart;

    for (let i = 0; i < currentCart.items.length; i++) {
      if (currentCart.items[i].product_id === album.product_id) {
        inCart = true;
        break;
      }
    }

    if (!inCart) {
      newCart.items.push(...currentCart.items);

      newCart.items.push({
        id: album._id,
        artist_name: album.artist_name,
        product_id: album.product_id,
        album_name: album.album_name,
        download_price: album.download_price,
        art_url: album.art_url,
        quantity: 1,
      });

      newCart.total = currentCart.total + album.download_price;

      req.user.updateCart(newCart);
      req.user.save();
    }
    res.status(200).json({ message: 'Album added to cart', user: req.user });
  }
}

async function removeFromCart(req, res, next) {
  let product_id = req.params.product_id;
  let found = product_id.match(/coin/g);

  if (!!found) {
    let coin;

    try {
      coin = await Coin.findOne({ product_id: req.params.product_id }).exec();
      if (!coin) {
        const error = new Error('Could not find coin.');
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
    let newCart = { items: [], total: 0 };
    let currentCart = req.user.getCart();

    let items = currentCart.items.filter(
      ({ product_id }) => product_id !== coin.product_id,
    );

    newCart.items = items;

    newCart.total = currentCart.total > 0 ? currentCart.total - coin.price : 0;

    req.user.updateCart(newCart);
    req.user.save();

    res.status(200).json({ message: 'Coin removed from cart', user: req.user });
  } else {
    let album;
    try {
      album = await Album.findOne({ product_id: req.params.product_id }).exec();
      if (!album) {
        const error = new Error('Could not find album.');
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      console.log(err);
    }

    let newCart = { items: [], total: 0 };
    let currentCart = req.user.getCart();
    let items = currentCart.items.filter(
      ({ product_id }) => product_id !== album.product_id,
    );

    newCart.items = items;

    newCart.total =
      currentCart.total > 0 ? currentCart.total - album.download_price : 0;

    req.user.updateCart(newCart);
    req.user.save();

    res
      .status(200)
      .json({ message: 'Album removed from cart', user: req.user });
  }
}

function getUser(req, res, next) {
  res.status(200).json({ message: 'Fetched user success', user: req.user });
}

function getCoins(req, res, next) {
  res
    .status(200)
    .json({ message: 'Fetched user coins', coins: req.user.coins });
}

function exchangeCoins(req, res, next) {
  const type = req.body.type;
  const amount = req.body.amount;

  req.user.exchangeCoins(type, amount);
  let coins = req.user.getCoins();

  res.status(200).json({ message: 'Fetched user coins', coins: coins });
}

module.exports = {
  addToCart,
  removeFromCart,
  getUser,
  getCoins,
  exchangeCoins,
};

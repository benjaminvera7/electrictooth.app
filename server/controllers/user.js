const dbConnection = require('../services/database');

async function addToCart(req, res) {
  const user = req.user;
  const type = req.body.type;
  const productId = req.body.productId;
  let cart;

  switch (type) {
    case 'single':
      cart = await addSongToCart(productId, user);
      break;
    case 'album':
      cart = await addAlbumToCart(productId, user);
      break;
    case 'coin':
      cart = await addCoinToCart(productId, user);
      break;
  }

  res.status(200).json(cart);
}

async function addSongToCart(productId, user) {
  const song = await dbConnection.getSongByProductId(productId);
  const currentCart = user.cart;

  let inCart;

  for (let i = 0; i < currentCart.items.length; i++) {
    if (currentCart.items[i].product_id == song.product_id) {
      inCart = true;
      break;
    }
  }

  if (inCart) {
    return currentCart;
  }

  const newCart = { items: [], total: 0 };

  newCart.items.push(...currentCart.items);

  newCart.items.push({
    id: song._id,
    artist_name: song.artist_name,
    product_id: song.product_id,
    song_name: song.song_name,
    price: song.price,
    img_url: song.img_url,
    type: song.type,
  });

  newCart.total = currentCart.total + song.price;

  const { cart } = await dbConnection.updateCart(user, newCart);

  return cart;
}

async function addAlbumToCart(productId, user) {
  const album = await dbConnection.getAlbumByProductId(productId);
  const currentCart = user.cart;

  let inCart;

  for (let i = 0; i < currentCart.items.length; i++) {
    if (currentCart.items[i].product_id == album.product_id) {
      inCart = true;
      break;
    }
  }

  if (inCart) {
    return currentCart;
  }

  const newCart = { items: [], total: 0 };

  newCart.items.push(...currentCart.items);

  newCart.items.push({
    id: album._id,
    artist_name: album.artist_name,
    product_id: album.product_id,
    album_name: album.album_name,
    price: album.price,
    img_url: album.img_url,
    type: album.type,
  });

  newCart.total = currentCart.total + album.price;

  const { cart } = await dbConnection.updateCart(user, newCart);

  return cart;
}

async function addCoinToCart(productId, user) {
  const coin = await dbConnection.getCoinByProductId(productId);
  const currentCart = user.cart;

  let inCart;

  for (let i = 0; i < currentCart.items.length; i++) {
    if (currentCart.items[i].product_id === coin.product_id) {
      inCart = true;
      break;
    }
  }

  if (inCart) {
    return currentCart;
  }

  const newCart = { items: [], total: 0 };

  newCart.items.push(...currentCart.items);

  newCart.items.push({
    id: coin._id,
    product_id: coin.product_id,
    img_url: coin.img_url,
    price: coin.price,
    type: coin.type,
  });

  newCart.total = currentCart.total + coin.price;

  const { cart } = await dbConnection.updateCart(user, newCart);

  return cart;
}

async function removeFromCart(req, res) {
  const user = req.user;
  const type = req.body.type;
  const productId = req.body.productId;
  let cart;

  switch (type) {
    case 'single':
      cart = await removeSongFromCart(productId, user);
      break;
    case 'album':
      cart = await removeAlbumFromCart(productId, user);
      break;
    case 'coin':
      cart = await removeCoinFromCart(productId, user);
      break;
  }

  res.status(200).json(cart);
}

async function removeSongFromCart(productId, user) {
  const song = await dbConnection.getSongByProductId(productId);

  const newCart = { items: [], total: 0 };
  const currentCart = user.cart;

  const items = currentCart.items.filter(({ product_id }) => product_id !== song.product_id);

  newCart.items = items;

  newCart.total = currentCart.total > 0 ? currentCart.total - song.price : 0;

  const { cart } = await dbConnection.updateCart(user, newCart);

  return cart;
}

async function removeAlbumFromCart(productId, user) {
  const album = await dbConnection.getAlbumByProductId(productId);
  const newCart = { items: [], total: 0 };
  const currentCart = user.cart;

  const items = currentCart.items.filter(({ product_id }) => product_id !== album.product_id);

  newCart.items = items;

  newCart.total = currentCart.total > 0 ? currentCart.total - album.price : 0;

  let { cart } = await dbConnection.updateCart(user, newCart);

  return cart;
}

async function removeCoinFromCart(productId, user) {
  const coin = await dbConnection.getCoinByProductId(productId);
  const newCart = { items: [], total: 0 };
  const currentCart = user.cart;

  const items = currentCart.items.filter(({ product_id }) => product_id !== coin.product_id);

  newCart.items = items;

  newCart.total = currentCart.total > 0 ? currentCart.total - coin.price : 0;

  const { cart } = await dbConnection.updateCart(user, newCart);

  return cart;
}

async function addToPlaylist(req, res) {
  let product_id = req.params.product_id;
  let found = product_id.match(/-/g);

  if (!!found) {
    let currentPlaylist = req.user.playlist;
    let newPlaylist = [];
    let exists = currentPlaylist.some((s) => s.product_id === product_id);

    if (!exists) {
      const [song] = await dbConnection.getSongByProductId(product_id);

      let newSong = {
        product_id: song.product_id,
        id: song._id,
        song_name: song.song_name,
        artist_name: song.artist_name,
        art_url: song.art_url,
      };

      newPlaylist.push(newSong);
    }

    newPlaylist = [...newPlaylist, ...currentPlaylist];

    let { playlist } = await dbConnection.updatePlaylist(req.user, newPlaylist);

    res.status(200).json(playlist);
  } else {
    let album;
    let currentPlaylist = req.user.playlist;
    let newPlaylist = [];
    album = await dbConnection.getAlbumByProductId(product_id);

    album.songs.forEach((song) => {
      let exists = currentPlaylist.some((s) => s.id.toString() === song.id);

      if (!exists) {
        let newSong = {
          product_id: song.product_id,
          id: song._id,
          song_name: song.song_name,
          artist_name: song.artist_name,
          art_url: song.art_url,
        };

        newPlaylist.push(newSong);
      }
    });

    newPlaylist = [...newPlaylist, ...currentPlaylist];

    let { playlist } = await dbConnection.updatePlaylist(req.user, newPlaylist);

    res.status(200).json(playlist);
  }
}

async function removeFromPlaylist(req, res) {
  let product_id = req.params.product_id;
  let currentPlaylist = req.user.playlist;

  let newPlaylist = currentPlaylist.filter((s) => s.product_id !== product_id);

  let { playlist } = await dbConnection.updatePlaylist(req.user, newPlaylist);

  res.status(200).json(playlist);
}

function getUser(req, res) {
  res.status(200).json(req.user);
}

function getCoins(req, res) {
  res.status(200).json(req.user.coins);
}

module.exports = {
  addToCart,
  removeFromCart,
  getUser,
  getCoins,
  addToPlaylist,
  removeFromPlaylist,
};

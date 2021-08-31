const dbConnection = require('../services/database');

async function addToCart(req, res) {
  const user = req.user;
  const type = req.body.type;
  const id = req.body.id;
  const size = req.body.size;
  let cart;

  switch (type) {
    case 'track':
      cart = await addTrackToCart(id, user);
      break;
    case 'album':
      cart = await addAlbumToCart(id, user);
      break;
    case 'coin':
      cart = await addCoinToCart(id, user);
      break;
    case 'merch':
      cart = await addMerchToCart(id, user, size);
      break;
  }

  res.status(200).json(cart);
}

async function addMerchToCart(id, user, size) {
  const merch = await dbConnection.getProductById(id);

  const userCart = user.cart.cart;

  const inCart = userCart.items.some((i) => i.id.toString() === merch._id.toString());

  if (inCart) {
    return { cart: userCart };
  }

  const newCart = { items: [], total: 0 };

  newCart.items.push(...userCart.items);

  newCart.items.push({
    id: merch._id,
    artist_name: merch.artist_name,
    product_name: merch.product_name,
    price: merch.price,
    art_url: merch.art_url,
    art_name: merch.art_name,
    type: merch.type,
    quantity: 1,
    size: size
  });

  newCart.total = userCart.total + merch.price;

  const { cart: cart_id } = await dbConnection.getUserById(user._id);

  const cart = await dbConnection.updateUserCart(cart_id, newCart);

  return cart;

}

async function addTrackToCart(id, user) {
  const track = await dbConnection.getTrackById(id);
  const userCart = user.cart.cart;

  const inCart = userCart.items.some((i) => i.id.toString() === track._id.toString());

  if (inCart) {
    return { cart: userCart };
  }

  const newCart = { items: [], total: 0 };

  newCart.items.push(...userCart.items);

  newCart.items.push({
    id: track._id,
    artist_name: track.artist_name,
    track_name: track.track_name,
    download_price: track.download_price,
    art_url: track.art_url,
    art_name: track.art_name,
    type: track.type,
    quantity: 1,
  });

  newCart.total = userCart.total + track.download_price;

  const { cart: cart_id } = await dbConnection.getUserById(user._id);

  const cart = await dbConnection.updateUserCart(cart_id, newCart);

  return cart;
}

async function addAlbumToCart(id, user) {
  const album = await dbConnection.getAlbumById(id);
  const userCart = user.cart.cart;

  const inCart = userCart.items.some((i) => i.id.toString() === album._id.toString());

  if (inCart) {
    return { cart: userCart };
  }

  const newCart = { items: [], total: 0 };

  newCart.items.push(...userCart.items);

  newCart.items.push({
    id: album._id,
    artist_name: album.artist_name,
    album_name: album.album_name,
    download_price: album.download_price,
    art_url: album.art_url,
    art_name: album.art_name,
    type: album.type,
    quantity: 1,
  });

  newCart.total = userCart.total + album.download_price;

  const { cart: cart_id } = await dbConnection.getUserById(user._id);

  const cart = await dbConnection.updateUserCart(cart_id, newCart);

  return cart;
}

async function addCoinToCart(id, user) {
  const coin = await dbConnection.getCoinById(id);
  const userCart = user.cart.cart;

  const inCart = userCart.items.some((i) => i.id.toString() === coin._id.toString());

  if (inCart) {
    return { cart: userCart };
  }

  const newCart = { items: [], total: 0 };

  newCart.items.push(...userCart.items);

  newCart.items.push({
    id: coin._id,
    art_name: coin.art_name,
    price: coin.price,
    amount: coin.amount,
    type: coin.type,
  });

  newCart.total = userCart.total + coin.price;

  const { cart: cart_id } = await dbConnection.getUserById(user._id);

  const cart = await dbConnection.updateUserCart(cart_id, newCart);

  return cart;
}

async function removeFromCart(req, res) {
  const user = req.user;
  const type = req.body.type;
  const id = req.body.id;
  const size = req.body.size;
  let cart;

  switch (type) {
    case 'track':
      cart = await removeTrackFromCart(id, user);
      break;
    case 'album':
      cart = await removeAlbumFromCart(id, user);
      break;
    case 'coin':
      cart = await removeCoinFromCart(id, user);
      break;
    case 'merch':
      cart = await removeMerchFromCart(id, user, size);
      break;
  }

  res.status(200).json(cart);
}

async function removeMerchFromCart(id, user, size) {
  const merch = await dbConnection.getProductById(id);
  const userCart = user.cart.cart;

  const newCart = { items: [], total: 0 };

  const items = userCart.items.filter((item) => item.size !== size);

  newCart.items = items;

  newCart.total = userCart.total > 0 ? userCart.total - merch.price : 0;

  const { cart: cart_id } = await dbConnection.getUserById(user._id);

  const cart = await dbConnection.updateUserCart(cart_id, newCart);

  return cart;
}

async function removeTrackFromCart(id, user) {
  const track = await dbConnection.getTrackById(id);
  const userCart = user.cart.cart;

  const newCart = { items: [], total: 0 };

  const items = userCart.items.filter((item) => item.id.toString() !== track.id);

  newCart.items = items;

  newCart.total = userCart.total > 0 ? userCart.total - track.download_price : 0;

  const { cart: cart_id } = await dbConnection.getUserById(user._id);

  const cart = await dbConnection.updateUserCart(cart_id, newCart);

  return cart;
}

async function removeAlbumFromCart(id, user) {
  const album = await dbConnection.getAlbumById(id);
  const userCart = user.cart.cart;

  const newCart = { items: [], total: 0 };

  const items = userCart.items.filter((item) => item.id.toString() !== album.id);

  newCart.items = items;

  newCart.total = userCart.total > 0 ? userCart.total - album.download_price : 0;

  const { cart: cart_id } = await dbConnection.getUserById(user._id);

  const cart = await dbConnection.updateUserCart(cart_id, newCart);

  return cart;
}

async function removeCoinFromCart(id, user) {
  const coin = await dbConnection.getCoinById(id);
  const userCart = user.cart.cart;

  const newCart = { items: [], total: 0 };

  const items = userCart.items.filter((item) => item.id.toString() !== coin.id);

  newCart.items = items;

  newCart.total = userCart.total > 0 ? userCart.total - coin.price : 0;

  const { cart: cart_id } = await dbConnection.getUserById(user._id);

  const cart = await dbConnection.updateUserCart(cart_id, newCart);

  return cart;
}

async function addToPlaylist(req, res) {
  const user = req.user;
  const track_id = req.body.id;
  const type = req.body.type;

  let playlist;

  switch (type) {
    case 'track':
      playlist = await addTrackToPlaylist(track_id, user);
      break;
    case 'album':
      playlist = await addAlbumToPlaylist(track_id, user);
      break;
  }

  res.status(200).json(playlist);
}

async function addTrackToPlaylist(track_id, user) {
  const currentPlaylist = user.playlist;

  const inPlaylist = currentPlaylist.tracks.some((t) => t._id.toString() === track_id);

  if (inPlaylist) {
    return currentPlaylist;
  }

  const playlist = await dbConnection.addTrackToPlaylist(currentPlaylist._id, track_id);

  return playlist;
}

async function addAlbumToPlaylist(album_id, user) {
  const currentPlaylist = user.playlist;

  const fullAlbum = await dbConnection.getFullAlbumById(album_id);

  let playlist = [];

  for await (track of fullAlbum.tracks) {
    const inPlaylist = currentPlaylist.tracks.some((t) => t._id.toString() === track._id.toString());

    if (!inPlaylist) {
      playlist = await dbConnection.addTrackToPlaylist(currentPlaylist._id, track._id);
    }
  }

  if (playlist.length == 0) {
    return currentPlaylist;
  } else {
    return playlist;
  }
}

async function removeTrackFromPlaylist(req, res) {
  const playlist_id = req.user.playlist._id;
  const track_id = req.params.id;

  const newPlaylist = await dbConnection.removeTrackFromPlaylist(playlist_id, track_id);

  res.status(200).json(newPlaylist);
}

function getUser(req, res) {
  res.status(200).json(req.user);
}

function getCoins(req, res) {
  res.status(200).json(req.user.coins);
}

async function getUserOrders(req, res) {
  const userId = req.user._id

  if (!userId) {
    return res.status(422).send({ error: 'User not found' });
  }

  const order = await dbConnection.getUserOrders(userId)

  if (!order) {
    return res.status(422).send({ error: 'No Orders found' });
  }

  res.status(200).json(order);
}


module.exports = {
  getUser,
  addToCart,
  removeFromCart,
  addToPlaylist,
  removeTrackFromPlaylist,
  getCoins,
  getUserOrders
};

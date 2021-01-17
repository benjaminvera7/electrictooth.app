const dbConnection = require('../services/database');

async function addToCart(req, res) {
  const user = req.user;
  const type = req.body.type;
  const id = req.body.id;
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
  }

  res.status(200).json(cart);
}

async function addTrackToCart(id, user) {
  const track = await dbConnection.getTrackById(id);
  const userCart = user.cart.cart;

  const inCart = userCart.items.some((i) => i._id === track._id);

  if (inCart) {
    return userCart;
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

  const inCart = userCart.items.some((i) => i._id === track._id);

  if (inCart) {
    return userCart;
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

async function removeFromCart(req, res) {
  const user = req.user;
  const type = req.body.type;
  const id = req.body.id;
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
  }

  res.status(200).json(cart);
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

  const playlist = await dbConnection.updateUserPlaylist(currentPlaylist._id, track_id);

  return playlist;
}

//const album = await dbConnection.getAlbumById(id);

// const product = await dbConnection.getProduct(product_id);

// if (product.type === 'single') {
//   const songExistsInPlaylist = currentPlaylist.some((s) => s.product_id === product_id);

//   if (songExistsInPlaylist) {
//     return res.status(200).json(currentPlaylist);
//   }

//   const newPlaylist = [...currentPlaylist];

//   const newSong = {
//     product_id: product.product_id,
//     id: product._id,
//     song_name: product.song_name,
//     artist_name: product.artist_name,
//     img_url: product.img_url,
//   };

//   newPlaylist.push(newSong);

//   const { playlist } = await dbConnection.updatePlaylist(req.user, newPlaylist);

//   res.status(200).json(playlist);
// } else if (product.type === 'album') {
//   const newPlaylist = [...currentPlaylist];

//   const album = await dbConnection.getFullAlbumByProductId(product_id);
//   const songs = album.filter((p) => p.position !== undefined);

//   songs.forEach((song) => {
//     const existsInPlaylist = currentPlaylist.some((s) => s.id.toString() === song.id);

//     if (!existsInPlaylist) {
//       const newSong = {
//         product_id: song.product_id,
//         id: song._id,
//         song_name: song.song_name,
//         artist_name: song.artist_name,
//         img_url: song.img_url,
//       };

//       newPlaylist.push(newSong);
//     }
//   });

//   const { playlist } = await dbConnection.updatePlaylist(req.user, newPlaylist);

//   res.status(200).json(playlist);
// }

function getUser(req, res) {
  res.status(200).json(req.user);
}

module.exports = {
  getUser,
  addToCart,
  removeFromCart,
  addToPlaylist,
};

// async function addCoinToCart(productId, user) {
//   const coin = await dbConnection.getCoinByProductId(productId);
//   const currentCart = user.cart;

//   const inCart = currentCart.items.some((i) => i.product_id === coin.product_id);

//   if (inCart) {
//     return currentCart;
//   }

//   const newCart = { items: [], total: 0 };

//   newCart.items.push(...currentCart.items);

//   newCart.items.push({
//     id: coin._id,
//     product_id: coin.product_id,
//     img_url: coin.img_url,
//     price: coin.price,
//     type: coin.type,
//     quantity: coin.quantity,
//   });

//   newCart.total = currentCart.total + coin.price;

//   const { cart } = await dbConnection.updateCart(user, newCart);

//   return cart;
// }

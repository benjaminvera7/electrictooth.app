const Album = require('../models/album');
const Order = require('../models/order');
const User = require('../models/user');

var APP_URL;
var SERVER_URL;

if (process.env.NODE_ENV === 'development') {
  APP_URL = 'http://localhost:3000';
  SERVER_URL = 'http://localhost:3090';
} else {
  APP_URL = SERVER_URL = 'https://electrictooth.app';
}

async function requestPayment(req, res) {
  let cart = await req.user.getCart();
  let order;

  order = new Order({
    userId: req.user._id,
    status: 'PENDING',
    cart: cart,
    type: 'ETH',
  });

  let newOrder = await order.save();

  res
    .status(200)
    .json({ message: 'Order created', order: newOrder, error: false });
}

async function returnPayment(req, res) {
  const txHash = req.params.hash;
  const orderId = req.params.orderId;

  let order = await Order.findOneAndUpdate(
    { _id: orderId },
    { status: 'SUCCESSFUL' },
    { hash: txHash },
  ).exec();

  let user = req.user;
  let cart = req.user.cart;
  let coins = 0;

  for (const item of cart.items) {
    let found = item.product_id.match(/coin/g);
    if (!!found) {
      coins = coins + parseInt(item.product_id.substring(4, 7), 10);
    }
  }

  user.exchangeCoins('ADD', coins);

  let albumArray = [];

  for (const item of cart.items) {
    let found = item.product_id.match(/ET/g);
    if (!!found) {
      let hasAlbum = user.albumCollection.filter(
        (album) => album.product_id === item.product_id,
      );

      if (hasAlbum.length == 0) {
        albumArray.push(item);
      }
    }
  }

  user.addToAlbumCollection(albumArray);
  user.clearCart();

  user.save();

  return res
    .status(200)
    .json({ message: 'SUCCESSFUL', order: order, error: false });
}

module.exports = {
  requestPayment,
  returnPayment,
};

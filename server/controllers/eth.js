
const Order = require('../models/order');
const dbConnection = require('../services/database')

async function requestPayment(req, res) {
  const user = req.user;

  const order = await dbConnection.createOrder(user, 'ETH');

  res
    .status(200)
    .json({ message: 'Order created', order: order, error: false });
}

async function returnPayment(req, res) {
  const txHash = req.params.hash;
  const orderId = req.params.orderId;

  const order = await dbConnection.updateOrderStatusById(
    orderId,
    'SUCCESSFUL',
    txHash,
  );
  
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

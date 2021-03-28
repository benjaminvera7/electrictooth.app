const dbConnection = require('../services/database');
const config = require('../config');

async function requestPayment(req, res) {
  const userId = req.user._id;  
  const cart = req.user.cart.cart;  

  const order = await dbConnection.createOrder(userId, cart, 'ETH');

  res.status(200).json(order);
}

async function returnPayment(req, res) {
  const txHash = req.params.hash;
  const orderId = req.params.orderId;

  const order = await dbConnection.updateEthOrderStatusById(
    orderId,
    'SUCCESSFUL',
    txHash,
  );

  let user = await dbConnection.getUserById(order.user_id);

  /* Add coins to user account */
  let coins = 0;
  for (const item of order.cart.items) {
    if (item.type === 'coin') {
      coins = coins + item.amount;
    }
  }

  await dbConnection.addCoin(user, coins);

  /* Add albums to user account */
  let library = [];
  for (const item of order.cart.items) {
    if (item.type === 'track') {
      let hasTrack = user.library.filter((i) => i._id.toString() === item.id.toString());

      if (hasTrack.length == 0) {
        let track = await dbConnection.getTrackById(item.id);
        library.push(track);
      }
    }

    if (item.type === 'album') {
      let hasAlbum = user.library.filter((i) => i._id.toString() === item.id.toString());

      if (hasAlbum.length == 0) {
        let album = await dbConnection.getAlbumById(item.id);
        library.push(album);
      }
    }
  }

  await dbConnection.addToLibrary(user, library);
  await dbConnection.updateUserCart(user.cart, { items: [], total: 0 });

  return res.redirect(`${config.host}/download/${orderId}`);
}

module.exports = {
  requestPayment,
  returnPayment,
};
const dbConnection = require('../services/database');
const paypal = require('../services/paypal');
const config = require('../config');

async function requestPayment(req, res) {
  const userId = req.body.userId;

  const user = await dbConnection.getUserById(userId);

  const order = await dbConnection.createOrder(userId, user.cart.cart, 'USD');

  const payment = createPaymentObject(order);

  const { error, response } = await paypal.createPayment(payment);

  if (error) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(response));
  }

  res.redirect(response.redirectUrl);
}

async function returnPayment(req, res) {
  const paymentId = req.query.paymentId;
  const PayerID = req.query.PayerID;
  let orderId;

  let { error, response } = await paypal.getResponse(paymentId, PayerID);

  orderId = response.transactions[0].invoice_number;

  if (error) {
    await dbConnection.updateOrderStatusById(orderId, 'FAILED');
    //TODO: redirect to error processing page
    res.end();
  }

  let order = await dbConnection.updateOrderStatusById(orderId, 'SUCCESSFUL');
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
      let hadTrack = user.library.filter((i) => i._id.toString() === item.id.toString());

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

function createPaymentObject(order) {
  const payment = paypal.getPaymentTemplate();

  payment.transactions[0].invoice_number = order._id.toString();
  payment.transactions[0].amount.total = order.cart.total;

  const items = payment.transactions[0].item_list.items;

  order.cart.items.forEach((item) => {
    if (item.type === 'track') {
      items.push({
        name: `${item.artist_name} - ${item.track_name}`,
        description: `${item.artist_name} - ${item.track_name} (MP3)`,
        quantity: 1,
        price: item.download_price,
        sku: item.id,
        currency: order.currency,
      });
    }

    if (item.type === 'coin') {
      items.push({
        name: `${item.amount} stream coins`,
        description: 'Coins for sustainable streaming',
        quantity: 1,
        price: item.price,
        sku: item.id,
        currency: order.currency,
      });
    }

    if (item.type === 'album') {
      items.push({
        name: `${item.artist_name} - ${item.album_name}`,
        description: `${item.artist_name} - ${item.album_name} (ZIP)`,
        quantity: 1,
        price: item.download_price,
        sku: item.id,
        currency: order.currency,
      });
    }
  });

  return payment;
}

module.exports = {
  requestPayment,
  returnPayment,
};

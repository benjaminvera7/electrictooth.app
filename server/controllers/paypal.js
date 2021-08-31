const dbConnection = require('../services/database');
const paypal = require('../services/paypal');
const config = require('../config');
const mailer = require('../services/mailer');

async function requestPayment(req, res) {
  const userId = req.user._id;
  const { cart } = req.user.cart.toObject();

  try {

    const order = await dbConnection.createOrder(userId, cart, 'USD');

    const payment = createPaymentObject(order);

    let { response } = await paypal.createPayment(payment);

    res.redirect(response.redirectUrl);

  } catch (error) {
    console.log(error)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(response));
  }
}

async function returnPayment(req, res) {
  const paymentId = req.query.paymentId;
  const PayerID = req.query.PayerID;
  let orderId;

  let { error, response } = await paypal.getResponse(paymentId, PayerID);

  orderId = response.transactions[0].invoice_number;

  const shippingAddress = response.transactions[0].item_list.shipping_address;

  if (error) {
    await dbConnection.updateOrderStatusById(orderId, 'FAILED');
    //TODO: redirect to error processing page
    res.end();
  }

  await dbConnection.updateOrderStatusById(orderId, 'SUCCESSFUL');
  await dbConnection.updateOrderShippingAddressById(orderId, shippingAddress);

  let order = await dbConnection.getOrderById(orderId);

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

    if (item.type === 'merch') {
      const merch = await dbConnection.getProductById(item.id);
      const size = item.size;

      const quantity = JSON.parse(merch.quantity);

      const updatedQty = {
        ...quantity,
        [size]: quantity[size] - 1
      }

      await dbConnection.updateProductQuantityById(item.id, JSON.stringify(updatedQty))
    }

  }

  await dbConnection.addToLibrary(user, library);
  await dbConnection.updateUserCart(user.cart, { items: [], total: 0 });

  await mailer.sendOrderSummaryMail(user, order)

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
        sku: item.id.toString(),
        currency: order.currency,
      });
    }

    if (item.type === 'coin') {
      items.push({
        name: `${item.amount} stream coins`,
        description: 'Coins for sustainable streaming',
        quantity: 1,
        price: item.price,
        sku: item.id.toString(),
        currency: order.currency,
      });
    }

    if (item.type === 'album') {
      items.push({
        name: `${item.artist_name} - ${item.album_name}`,
        description: `${item.artist_name} - ${item.album_name} (ZIP)`,
        quantity: 1,
        price: item.download_price,
        sku: item.id.toString(),
        currency: order.currency,
      });
    }

    if (item.type === 'merch') {
      items.push({
        name: `${item.product_name}`,
        description: `${item.product_name} (${item.size})`,
        quantity: 1,
        price: item.price,
        sku: item.id.toString(),
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

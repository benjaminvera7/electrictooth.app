const dbConnection = require('../services/database');
const paypal = require('../services/paypal');
const config = require('../config');

async function requestPayment(req, res) {

  const userId = req.body.userId;

  const user = await dbConnection.getUserById(userId);

  const order = await dbConnection.createOrder(user, 'USD');

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
  let user = await dbConnection.getUserById(order.userId);


  /* Add coins to user account */
  let coins = 0;
  for (const item of order.cart.items) {
    let found = item.product_id.match(/coin/g);
    if (!!found) {
      coins = coins + parseInt(item.product_id.substring(4, 7), 10);
    }
  }
  user.exchangeCoins('ADD', coins);

  /* Add albums to user account */
  let albumArray = [];
  for (const item of order.cart.items) {
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

  /* Clear cart & save */
  user.clearCart();
  user.save();

  return res.redirect(`${config.host}/download/${orderId}`);
}

function createPaymentObject(order) {
  const payment = paypal.getPaymentTemplate();

  payment.transactions[0].invoice_number = order._id;
  payment.transactions[0].amount.total = order.cart.total;

  const items = payment.transactions[0].item_list.items;

  order.cart.items.forEach((item) => {
    let product_id = item.product_id;
    let found = product_id.match(/coin/g);

    if (!!found) {
      items.push({
        name: item.product_id,
        description: 'Coins for sustainable streaming',
        quantity: item.quantity,
        price: item.price,
        sku: item.product_id,
        currency: 'USD',
      });
    } else {
      let description;

      if (item.song_name) {
        description = `${item.song_name} (MP3)`;
      } else {
        description = item.album_name;
      }

      items.push({
        name: item.product_id,
        description: description,
        quantity: item.quantity,
        price: item.download_price,
        sku: item.product_id,
        currency: 'USD',
      });
    }
  });

  return payment;
}

module.exports = {
  requestPayment,
  returnPayment,
};

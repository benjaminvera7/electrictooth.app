const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const config = require('./config');

const checkCustomerAuth = require('./util/checkCustomerAuth');

const songRoutes = require('./routes/song');
const authRoutes = require('./routes/auth');
const resetRoutes = require('./routes/reset');
const paypalRoutes = require('./routes/paypal');
const userRoutes = require('./routes/user');
const ethRoutes = require('./routes/eth');
const downloadRoutes = require('./routes/download');
const streamRoutes = require('./routes/stream');
const orderRoutes = require('./routes/order');

const productRoutes = require('./routes/products');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/user', checkCustomerAuth, userRoutes);

app.use('/song', songRoutes);
app.use('/auth', authRoutes);
app.use('/reset', resetRoutes);
app.use('/paypal', paypalRoutes);

app.use('/eth', checkCustomerAuth, ethRoutes);
app.use('/download', checkCustomerAuth, downloadRoutes);
app.use('/stream', checkCustomerAuth, streamRoutes);
app.use('/order', checkCustomerAuth, orderRoutes);

app.get('/*', function passHTML(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(config.port);

console.log(`ET3-Server is listening on http://localhost:${config.port}`);

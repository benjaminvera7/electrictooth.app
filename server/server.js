const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const formidable = require('formidable');
const fs = require('fs');

const checkCustomerAuth = require('./util/checkCustomerAuth');

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

const upload = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};

const formParse = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

app.use('/admin/upload', async (req, res) => {
  let { fields, files } = await formParse(req);

  //let newProductId = generateProductId();
  let newFields = fields;

  var oldImagePath = files.image.path;
  var newImagePath = path.join(__dirname, `../server/uploads/${files.image.name}`);

  var oldAudioPath = files.audio.path;
  var newAudioPath = path.join(__dirname, `../server/music/${files.audio.name}`);

  await upload(oldImagePath, newImagePath);
  await upload(oldAudioPath, newAudioPath);

  res.end();
});

app.use('/admin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let response = {
    result: 'success',
    token: 'oidioenfe3029u390423jnfasnfjksan',
  };

  res.status(200).json(response);
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reset', resetRoutes);
app.use('/api/v1/user', checkCustomerAuth, userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/stream', checkCustomerAuth, streamRoutes);
app.use('/api/v1/paypal', paypalRoutes);
app.use('/api/v1/download', checkCustomerAuth, downloadRoutes);
app.use('/api/v1/order', checkCustomerAuth, orderRoutes);

app.use('/eth', checkCustomerAuth, ethRoutes);

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

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const config = require('./config');

const checkCustomerAuth = require('./util/checkCustomerAuth');

const uploadRoutes = require('./routes/upload');
const musicRoutes = require('./routes/music');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const resetRoutes = require('./routes/reset');
const streamRoutes = require('./routes/stream');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/music', musicRoutes);
app.use('/api/v1/reset', resetRoutes);
app.use('/api/v1/user', checkCustomerAuth, userRoutes);
app.use('/api/v1/stream', checkCustomerAuth, streamRoutes);

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

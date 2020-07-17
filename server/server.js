const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
mongoose.Promise = require('bluebird');
const cors = require('cors');
const config = require('./config');
const passport = require('passport');

require('../server/services/passport');
//protects routes by verifying user token
const requireAuth = passport.authenticate('jwt', { session: false });

const authRoutes = require('./routes/auth');
const albumRoutes = require('./routes/album');
const paypalRoutes = require('./routes/paypal');
const ethRoutes = require('./routes/eth');
const downloadRoutes = require('./routes/download');
const userRoutes = require('./routes/user');
const songRoutes = require('./routes/song');
const streamRoutes = require('./routes/stream');
const orderRoutes = require('./routes/order');
const resetRoutes = require('./routes/reset');

const db = mongoose.connection.openUri(config.dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);

db.on('error', () =>
  console.error.bind(console, '# MongoDB - connection error: '),
);
db.once('open', () => console.log('ET3-Database Connection ok!'));

const app = express();

app.use(
  cors({
    exposedHeaders: '*',
  }),
);

function passHTML(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(
    err,
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/user', requireAuth, userRoutes);
app.use('/stream', requireAuth, streamRoutes);
app.use('/order', requireAuth, orderRoutes);
app.use('/download', requireAuth, downloadRoutes);
app.use('/eth', requireAuth, ethRoutes);


app.use('/reset', resetRoutes);
app.use('/auth', authRoutes);
app.use('/albums', albumRoutes);
app.use('/paypal', paypalRoutes);
app.use('/song', songRoutes);
app.get('/*', passHTML);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(config.port);

console.log(`ET3-Server is listening on http://localhost:${config.port}`);

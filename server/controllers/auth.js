const User = require('../models/users');
const dbConnection = require('../services/database');
const encrypt = require('../services/encryption');

async function signin(req, res) {
  if (!req.body.password || !req.body.email) {
    return res.status(422).send({ error: true, message: 'Unable to log in' });
  } else {
    const user = await dbConnection.getUserByEmail(req.body.email);

    if (!user) {
      return res.status(422).send({ error: true, message: 'Unable to log in' });
    }

    const isMatch = await encrypt.comparePassword(user, req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: true, message: 'Unable to log in' });
    }

    const cart = await dbConnection.getUserCart(user.cart);
    const playlist = await dbConnection.getUserPlaylist(user.playlist);

    if (isMatch) {
      return res.status(200).json({
        userId: user._id,
        library: user.library,
        playlist: playlist,
        cart: cart.toObject(),
        coins: user.coins,
        username: user.username,
        token: encrypt.tokenForUser(user),
      });
    }
  }
}

async function signup(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || !username) {
    return res.status(422).send({
      error: true,
      message: 'You must provide username, email and password',
    });
  }

  const existingUser = await dbConnection.getUserByEmail(email);

  if (existingUser) {
    return res.status(422).send({
      error: true,
      message: 'Email is in use',
    });
  }

  const user = new User({
    username: username,
    email: email,
    password: password,
    library: [],
    stream: [],
    coins: 100,
    reset_token: '',
  });

  const newCart = await dbConnection.createUserCart();
  user.cart = newCart._id;

  const newPlaylist = await dbConnection.createUserPlaylist();
  user.playlist = newPlaylist._id;

  const newUser = await encrypt.encryptUserPassword(user);
  newUser.save();

  const cart = await dbConnection.getUserCart(newUser.cart);
  const playlist = await dbConnection.getUserPlaylist(newUser.playlist);

  return res.status(200).json({
    username: user.username,
    token: encrypt.tokenForUser(user),
    cart: cart.toObject(),
    library: [],
    stream: [],
    playlist: playlist,
    coins: 100,
  });
}

module.exports = {
  signin,
  signup,
};

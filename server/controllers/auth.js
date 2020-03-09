const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

function signin(req, res, next) {
  if (!req.body.password || !req.body.email) {
    return res.status(422).send({ error: true, message: 'Unable to log in' });
  } else {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) {
        return res
          .status(422)
          .send({ error: true, message: 'Unable to log in' });
      }
      if (!user) {
        return res
          .status(422)
          .send({ error: true, message: 'Unable to log in' });
      }

      // compare passwords - is `password` equal to user.password?
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) {
          return res
            .status(422)
            .send({ error: true, message: 'Unable to log in' });
        }
        if (!isMatch) {
          return res
            .status(422)
            .send({ error: true, message: 'Unable to log in' });
        }

        return res.json({
          userId: user._id,
          albumCollection: user.albumCollection,
          playlist: user.playlist,
          cart: user.cart,
          coins: user.coins,
          username: user.username,
          token: tokenForUser(user),
        });
      });
    });
  }
}

function signup(req, res, next) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: true, message: 'You must provide an email and password' });
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: true, message: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record

    const user = new User({
      username: username,
      email: email,
      password: password,
      albumCollection: [],
      playlist: [],
      cart: { items: [], total: 0 },
      reset_password_token: '',
      coins: 100,
    });

    user.encrypt(() => {
      user.save((err) => {
        if (err) {
          return next(err);
        }
        // Repond to request indicating the user was created
        res.json({
          userId: user._id,
          username: username,
          albumCollection: [],
          playlist: [],
          cart: user.cart,
          coins: user.coins,
          token: tokenForUser(user),
        });
      });
    });
  });
}

module.exports = {
  signin,
  signup,
};

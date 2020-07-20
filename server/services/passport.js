const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const dbConnection = require('../services/database');

class PassportService {
  constructor() {
    this.localOptions = {
      usernameField: 'email',
    };
    this.jwtOptions = {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.secret,
    };
  }

  initLocalStrategy() {
    /* this kindly add the user object to all authorized requests */
    const localLogin = new LocalStrategy(this.localOptions, this.verifyLocalUser);
    passport.use(localLogin);
  }

  async verifyLocalUser(email, password, done) {
    const user = await dbConnection.getUserByEmail(email);

    //create new service for encryption?
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  }

  initJwtStrategy() {
    const jwtLogin = new JwtStrategy(this.jwtOptions, this.verifyJwtUser);
    passport.use(jwtLogin);
  }

  async verifyJwtUser(payload, done) {
    const userId = payload.sub;
    const user = await dbConnection.getUserById(userId);

    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }
}

const Passport = new PassportService();

Passport.initLocalStrategy();
Passport.initJwtStrategy();
const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const dbConnection = require('../services/database');
const encrypt = require('../services/encryption');

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
    const localLogin = new LocalStrategy(
      this.localOptions,
      this.verifyLocalUser,
    );
    passport.use(localLogin);
  }

  initJwtStrategy() {
    const jwtLogin = new JwtStrategy(this.jwtOptions, this.verifyJwtUser);
    passport.use(jwtLogin);
  }

  async verifyLocalUser(email, candidatePassword, done) {
    const user = await dbConnection.getUserByEmail(email);

    const isMatch = await encrypt.comparePassword(user, candidatePassword);

    if (isMatch) {
      done(null, user);
    } else {
      done(null, false);
    }
  }

  async verifyJwtUser(payload, done) {
    const userId = payload.sub;
    const user = await dbConnection.getUserById(userId);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }

  requireAuth() {
    return passport.authenticate('jwt', { session: false });
  }
}

const Passport = new PassportService();

Passport.initLocalStrategy();
Passport.initJwtStrategy();

module.exports = Passport;

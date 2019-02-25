const User = require('../models').user,
  errors = require('../errors'),
  { authValidation } = require('../constants/errorMessages'),
  config = require('../../config'),
  jwt = require('jwt-simple');

exports.handle = (req, res, next) => {
  if (!req.headers.token) next(errors.invalidAuthentication(authValidation.NOT_LOGGED_IN));
  let decoded;
  try {
    decoded = jwt.decode(req.headers.token, config.common.session.secret);
  } catch (e) {
    next(errors.invalidToken(authValidation.INVALID_TOKEN));
    return;
  }
  User.findOne({ where: { email: decoded.email } })
    .then(user => {
      if (!user) throw errors.invalidAuthentication(authValidation.NOT_LOGGED_IN);
    })
    .catch(next);
  next();
};
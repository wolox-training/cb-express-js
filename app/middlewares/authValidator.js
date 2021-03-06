const User = require('../models').user,
  errors = require('../errors'),
  { authValidation } = require('../constants/errorMessages'),
  config = require('../../config'),
  jwt = require('jwt-simple');

exports.handle = (req, res, next) => {
  if (!req.headers.token) return next(errors.invalidAuthentication(authValidation.NOT_LOGGED_IN));
  let decoded;
  try {
    decoded = jwt.decode(req.headers.token, config.common.session.secret);
  } catch (e) {
    return next(errors.invalidToken(authValidation.INVALID_TOKEN));
  }
  return User.findOne({ where: { email: decoded.email } })
    .then(user => {
      if (!user) return next(errors.invalidAuthentication(authValidation.NOT_LOGGED_IN));
      req.isAdmin = user.isAdmin;
      next();
    })
    .catch(next);
};

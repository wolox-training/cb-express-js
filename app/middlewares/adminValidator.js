const errors = require('../errors'),
  { authValidation } = require('../constants/errorMessages');

exports.handle = (req, res, next) =>
  req.user.isAdmin ? next() : next(errors.invalidAuthentication(authValidation.UNAUTHORIZED));

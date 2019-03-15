const errors = require('../errors'),
  { authValidation } = require('../constants/errorMessages');

exports.handle = (req, res, next) =>
  req.isAdmin ? next() : next(errors.invalidAuthentication(authValidation.UNAUTHORIZED));

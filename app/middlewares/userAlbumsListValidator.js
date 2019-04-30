const errors = require('../errors'),
  { authValidation } = require('../constants/errorMessages');

exports.handle = (req, res, next) => {
  if (req.isAdmin || req.user.id === Number(req.params.user_id)) return next();
  return next(errors.unauthorized(authValidation.unauthorized));
};

const errors = require('../errors'),
  { validationResult, checkSchema } = require('express-validator/check'),
  { userLoginSchema } = require('../schemas/user');

exports.handle = [
  checkSchema(userLoginSchema),
  (req, res, next) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
      const mappedErrors = valErrors.mapped();
      const errs = Object.keys(mappedErrors).map(key => ({ [key]: mappedErrors[key].msg }));
      next(errors.invalidFields(errs));
    }
    next();
  }
];

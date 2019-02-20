const errors = require('../errors'),
  { validationResult, checkSchema } = require('express-validator/check');

exports.handle = schema => [
  checkSchema(schema),
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

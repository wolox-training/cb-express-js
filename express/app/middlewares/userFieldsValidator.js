const errors = require('../errors'),
  { checkSchema, validationResult } = require('express-validator/check'),
  { userCreationSchema } = require('../schemas/user');

const requiredFields = ['firstName', 'lastName', 'email', 'password'];

exports.handle = (req, res, next) => {
  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
    next(errors.missingFields(`${missingFields} field missing`));
  }
  next();
};

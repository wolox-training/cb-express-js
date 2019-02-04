const errors = require('./errors');

const requiredFields = ['firstName', 'lastName', 'email', 'password'];

exports.handle = (req, res, next) => {
  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
    errors.handle(`${missingFields} are required`, req, res, next);
  }
  next();
};

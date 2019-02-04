const errors = require('../errors');

const validEmail = /[A-Z0-9._%+-]*@wolox.com.ar/;

const isValidEmail = email => validEmail.test(email);

exports.handle = (req, res, next) => {
  if (!isValidEmail(req.body.email)) {
    errors.handle('Invalid email', req, res, next);
  }
  next();
};

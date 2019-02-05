const errors = require('../errors');

const isAlphanumeric = string => string.match(/^[a-zA-Z0-9]+$/);

const isValidPassword = password => password.length >= 8 && password.length <= 24 && isAlphanumeric(password);

const validEmail = /[A-Z0-9._%+-]*@wolox.com.ar/;

const isValidEmail = email => validEmail.test(email);

exports.handle = (req, res, next) => {
  if (!isValidEmail(req.body.email)) {
    next(errors.invalidEmail('Invalid email'));
  }
  if (!isValidPassword(req.body.password)) {
    next(errors.invalidPassword('Invalid password'));
  }
  next();
};

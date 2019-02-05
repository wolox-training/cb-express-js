const user = require('../models').user,
  userService = require('../services/userService'),
  errors = require('../errors'),
  logger = require('../logger'),
  bcrypt = require('bcryptjs');

const encryptPassword = ({ password }) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(password, salt);
};

exports.create = (req, res, next) =>
  user.findOne({ where: { email: req.body.email } }).then(userInstances => {
    if (userInstances) {
      next(errors.emailAlreadyExists('The email already exists'));
    } else {
      return encryptPassword(req.body).then(hashedPassword => {
        const fields = { ...req.body, password: hashedPassword };
        return userService
          .create(fields)
          .then(newUser => {
            const User = { id: newUser.id, firstName: newUser.firstName, lastName: newUser.lastName };
            logger.info(`The user ${User} was successfully created`);
            res.status(201).send(user);
          })
          .catch(error => {
            logger.error(`Failed to create user. ${error}`);
            res.status(400).send(error.toString());
          });
      });
    }
  });

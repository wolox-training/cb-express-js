const userService = require('../services/userService');
const logger = require('../logger');
const bcrypt = require('bcryptjs');

const encryptPassword = ({ password }) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(password, salt);
};

exports.create = (req, res) =>
  encryptPassword(req.body).then(hashedPassword => {
    const fields = { ...req.body, password: hashedPassword };
    return userService
      .create(fields)
      .then(newUser => {
        const user = { id: newUser.id, firstName: newUser.firstName, lastName: newUser.lastName };
        logger.info(`The user ${user} was successfully created`);
        res.status(201).send(user);
      })
      .catch(error => {
        logger.error(`Failed to create user. ${error}`);
        res.status(400).send(error.toString());
      });
  });

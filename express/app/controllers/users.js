const user = require('../models/user');
const logger = require('../logger');

exports.create = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  user
    .create({ firstName, lastName, email, password })
    .then(newUser => {
      logger.info(`The user ${newUser} was successfully created`);
      res.status(201).send(newUser);
    })
    .catch(error => {
      logger.error(`Failed to create user. ERROR: ${error}`);
      res.status(400).send(error);
    });
};

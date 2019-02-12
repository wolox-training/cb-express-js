const user = require('../models').user,
  userService = require('../services/userService'),
  errors = require('../errors'),
  logger = require('../logger'),
  bcrypt = require('bcryptjs'),
  { userCreationSerializer, userSerializer } = require('../serializers/userSerializer');

const encryptPassword = ({ password }) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(password, salt);
};

exports.create = (req, res, next) =>
  user.findOne({ where: { email: req.body.email } }).then(userInstance => {
    if (userInstance) {
      return next(errors.emailAlreadyExists('The email already exists'));
    }
    const usr = userCreationSerializer(req.body);
    return encryptPassword(usr).then(hashedPassword => {
      const fields = { ...usr, password: hashedPassword };
      return userService
        .create(fields)
        .then(newUser => {
          const User = userSerializer(newUser);
          logger.info(`The user ${JSON.stringify(User)} was successfully created`);
          res.status(201).send(User);
        })
        .catch(next);
    });
  });

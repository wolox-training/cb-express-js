const user = require('../models').user,
  userService = require('../services/userService'),
  errors = require('../errors'),
  logger = require('../logger'),
  config = require('../../config/index'),
  bcrypt = require('bcryptjs'),
  jwt = require('jwt-simple'),
  { userCreationSerializer, userSerializer, usersListSerializer } = require('../serializers/userSerializer');

const encryptPassword = ({ password }) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(password, salt);
};

exports.create = (isAdmin = false) => (req, res, next) =>
  user
    .findOne({ where: { email: req.body.email } })
    .then(userInstance => {
      if (userInstance) {
        if (isAdmin && !userInstance.isAdmin)
          return userService.updateUser(userInstance, { isAdmin }).then(adminUser => {
            const User = userSerializer(adminUser);
            logger.info(`The user ${JSON.stringify(User)} updated to admin`);
            res.status(201).send(User);
          });
        else throw errors.emailAlreadyExists('The email already exists');
      }
      const usr = userCreationSerializer(req.body);
      return encryptPassword(usr).then(hashedPassword => {
        const fields = { ...usr, password: hashedPassword, isAdmin };
        return userService.create(fields).then(newUser => {
          const User = userSerializer(newUser);
          logger.info(`The user ${JSON.stringify(User)} was successfully created`);
          res.status(201).send(User);
        });
      });
    })
    .catch(next);

exports.logIn = (req, res, next) =>
  userService
    .findUser(req.body.email)
    .then(userInstace => {
      if (!userInstace) throw errors.invalidCredentials('invalid email or password');
      return bcrypt.compare(req.body.password, userInstace.password).then(isValid => {
        if (!isValid) throw errors.invalidCredentials('invalid email or password');
        const token = jwt.encode({ email: userInstace.email }, config.common.session.secret);
        logger.info(`User ${userInstace.id} logged in`);
        res.status(200).send({ user: userSerializer(userInstace), token });
      });
    })
    .catch(next);

exports.list = (req, res, next) =>
  userService
    .usersList(req.query.page, req.query.limit)
    .then(users => {
      res.status(200).send({ users: usersListSerializer(users) });
    })
    .catch(next);

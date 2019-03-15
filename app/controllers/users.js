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

const sendUser = (usr, res, message) => {
  const User = userSerializer(usr);
  logger.info(message);
  return res.status(201).send(User);
};

const createUser = (usr, isAdmin = false) => {
  const User = userCreationSerializer(usr);
  return encryptPassword(User).then(hashedPassword => {
    const fields = { ...User, password: hashedPassword, isAdmin };
    return userService.create(fields);
  });
};

exports.create = (req, res, next) =>
  user
    .findOne({ where: { email: req.body.email } })
    .then(userInstance => {
      if (userInstance) throw errors.emailAlreadyExists('The email already exists');
      createUser(req.body).then(newUser => {
        sendUser(newUser, res, 'The user was successfully created');
      });
    })
    .catch(next);

exports.createAdmin = (req, res, next) =>
  user
    .findOne({ where: { email: req.body.email } })
    .then(userInstance => {
      if (userInstance) {
        if (userInstance.isAdmin) throw errors.emailAlreadyExists('The admin already exists');
        return userService.updateUser(userInstance, { isAdmin: true }).then(adminUser => {
          sendUser(adminUser, res, 'The user upgraded to admin');
        });
      }
      createUser(req.body).then(newAdmin => {
        sendUser(newAdmin, res, 'The admin was successfully created');
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

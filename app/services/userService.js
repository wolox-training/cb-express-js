const user = require('../models').user,
  errors = require('../errors');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

exports.create = userFields =>
  user.create(userFields).catch(() => {
    throw errors.databaseError('Failed to create');
  });

exports.findUser = email =>
  user.findOne({ where: { email } }).catch(() => {
    throw errors.databaseError('User not found');
  });

exports.usersList = (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) =>
  user
    .findAll({
      attributes: ['id', 'firstName', 'lastName', 'email'],
      offset: limit * (page - 1),
      limit
    })
    .catch(() => {
      throw errors.databaseError('Failed to get users list');
    });

exports.updateUser = (userInstance, fields) =>
  userInstance.update(fields).catch(() => {
    throw errors.databaseError('Failed to update user privileges');
  });

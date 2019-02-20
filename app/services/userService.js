const user = require('../models').user,
  errors = require('../errors');

exports.create = userFields =>
  user.create(userFields).catch(() => {
    throw errors.databaseError('Failed to create');
  });

exports.findUser = email =>
  user.findOne({ where: { email } }).catch(() => {
    throw errors.databaseError('User not found');
  });

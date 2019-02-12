const user = require('../models').user,
  errors = require('../errors');

exports.create = userFields =>
  user.create(userFields).catch(() => {
    throw errors.databaseError('Failed to create');
  });

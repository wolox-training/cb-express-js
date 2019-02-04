const user = require('../models').user;

exports.create = async userFields =>
  user.findOne({ where: { email: userFields.email } }).then(userInstance => {
    if (userInstance) {
      throw new Error('Email already exists');
    } else {
      return user.create(userFields);
    }
  });

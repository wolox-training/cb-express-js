const user = require('../models').user;

exports.create = userFields => user.create(userFields);

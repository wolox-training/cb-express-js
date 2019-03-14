const request = require('request-promise'),
  config = require('../../config'),
  errors = require('../errors');

exports.list = () =>
  request(config.common.albumsUrl).catch(e => {
    throw errors.defaultError('Internal server error');
  });

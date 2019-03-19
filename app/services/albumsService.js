const request = require('request-promise'),
  config = require('../../config'),
  errors = require('../errors');

exports.list = () =>
  request({ method: 'GET', url: config.common.albumsUrl, json: true }).catch(e => {
    throw errors.badRequest('Failed to GET from albums service');
  });

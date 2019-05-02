const request = require('request-promise'),
  albumsUrl = require('../../config').common.albumsUrl,
  errors = require('../errors');

exports.list = () =>
  request({ method: 'GET', uri: albumsUrl, json: true }).catch(e => {
    throw errors.badRequest('Failed to GET from albums service');
  });

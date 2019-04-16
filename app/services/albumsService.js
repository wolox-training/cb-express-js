const request = require('request-promise'),
  config = require('../../config'),
  errors = require('../errors'),
  album = require('../models').album;

exports.list = () =>
  request({ method: 'GET', url: config.common.albumsUrl, json: true }).catch(e => {
    throw errors.badRequest('Failed to GET from albums service');
  });

exports.getAlbum = id =>
  request({ method: 'GET', url: `${config.common.albumsUrl}/${id}`, json: true }).catch(e => {
    throw errors.badRequest('Failed to the album from albums service');
  });

exports.purchase = newAlbum =>
  album.create(newAlbum).catch(error => {
    throw errors.databaseError('Failed to create album');
  });

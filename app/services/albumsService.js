const request = require('request-promise'),
  albumsUrl = require('../../config').common.albumsUrl,
  errors = require('../errors'),
  album = require('../models').album;

exports.list = () =>
  request({ method: 'GET', uri: albumsUrl, json: true }).catch(e => {
    throw errors.badRequest('Failed to GET from albums service');
  });

exports.getAlbum = id =>
  request({ method: 'GET', uri: `${albumsUrl}/${id}`, json: true }).catch(e => {
    throw errors.badRequest('Failed to get the album from albums service');
  });

exports.purchase = newAlbum =>
  album.create(newAlbum).catch(error => {
    throw errors.databaseError('Failed to create album');
  });

exports.userAlbumList = userId =>
  album.findAll({ where: { userId: Number(userId) } }).catch(() => {
    throw errors.databaseError('Failed to query albums');
  });

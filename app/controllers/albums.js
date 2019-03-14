const albumsService = require('../services/albumsService'),
  logger = require('../logger');

exports.list = (req, res, next) =>
  albumsService
    .list()
    .then(albums => {
      logger.info('Albums GET request succeeded');
      return res.status(200).send(albums);
    })
    .catch(next);

const albumsService = require('../services/albumsService'),
  logger = require('../logger');

exports.list = (req, res, next) =>
  albumsService
    .list()
    .then(albums => {
      logger.info('Albums GET request succeeded');
      return res.status(200).send({ albums });
    })
    .catch(next);

exports.purchase = (req, res, next) =>
  albumsService
    .getAlbum(req.params.id)
    .then(alb => {
      const newAlbum = { userId: req.user.id, albumId: alb.id, albumName: alb.title };
      albumsService.purchase(newAlbum).then(createdAlbum => {
        logger.info(`Album "${newAlbum.albumName}" purchased successfully`);
        return res.status(201).send(createdAlbum);
      });
    })
    .catch(next);

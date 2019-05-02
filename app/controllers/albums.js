const albumsService = require('../services/albumsService'),
  logger = require('../logger'),
  { albumSerializer } = require('../serializers/albumSerializer');

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
        return res.status(201).send(albumSerializer(createdAlbum));
      });
    })
    .catch(next);

exports.userAlbumList = (req, res, next) =>
  albumsService.userAlbumList(req.params.user_id).then(albums => {
    logger.info('Albums request succeeded');
    res.status(200).send({ albums: albums.map(albumSerializer) });
  });

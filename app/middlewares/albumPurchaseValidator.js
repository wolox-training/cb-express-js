const album = require('../models').album,
  { albumsValidation } = require('../constants/errorMessages'),
  errors = require('../errors');

exports.handle = (req, res, next) =>
  album
    .findOne({ where: { albumId: Number(req.params.id), userId: req.user.id } })
    .then(
      alb => (alb ? next(errors.albumAlreadyPurchased(albumsValidation.ALBUM_ALREADY_PURCHASED)) : next())
    );

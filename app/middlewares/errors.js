const errors = require('../errors'),
  logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.INVALID_USER]: 400,
  [errors.INVALID_AUTHENTICATION]: 401,
  [errors.BOOK_NOT_FOUND]: 404,
  [errors.SAVING_ERROR]: 400,
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500,
  [errors.EMAIL_ALREADY_EXISTS]: 400,
  [errors.INVALID_FIELDS]: 400,
  [errors.CREATION_FAILED]: 400,
  [errors.INVALID_CREDENTIALS]: 401,
  [errors.BAD_REQUEST]: 400,
  [errors.ALBUM_ALREADY_PURCHASED]: 400
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};

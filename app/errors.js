const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EMAIL_ALREADY_EXISTS = 'email_already_exists';
exports.emailAlreadyExists = message => internalError(message, exports.EMAIL_ALREADY_EXISTS);

exports.INVALID_FIELDS = 'invalid_Fields';
exports.invalidFields = message => internalError(message, exports.INVALID_FIELDS);

exports.CREATION_FAILED = 'creation_failed';
exports.creationFailed = message => internalError(message, exports.CREATION_FAILED);

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.INVALID_CREDENTIALS = 'invalid_credentials';
exports.invalidCredentials = message => internalError(message, exports.INVALID_CREDENTIALS);

exports.INVALID_AUTHENTICATION = 'invalid_authentication';
exports.invalidAuthentication = message => internalError(message, exports.INVALID_AUTHENTICATION);

exports.invalidToken = message => internalError(message, exports.INVALID_AUTHENTICATION);

exports.BAD_REQUEST = 'bad_request';
exports.badRequest = message => internalError(message, exports.BAD_REQUEST);

exports.ALBUM_ALREADY_PURCHASED = 'album_already_purchased';
exports.albumAlreadyPurchased = message => internalError(message, exports.ALBUM_ALREADY_PURCHASED);

exports.UNAUTHORIZED = 'unauthorized';
exports.unauthorized = message => internalError(message, exports.UNAUTHORIZED);

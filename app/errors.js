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

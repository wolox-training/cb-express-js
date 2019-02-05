const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.INVALID_EMAIL = 'invalid_email';
exports.invalidEmail = message => internalError(message, exports.INVALID_EMAIL);

exports.INVALID_PASSWORD = 'invalid_password';
exports.invalidPassword = message => internalError(message, exports.INVALID_PASSWORD);

exports.MISSING_FIELDS = 'missing_Fields';
exports.missingFields = message => internalError(message, exports.MISSING_FIELDS);

exports.EMAIL_ALREADY_EXISTS = 'email_already_exists';
exports.emailAlreadyExists = message => internalError(message, exports.EMAIL_ALREADY_EXISTS);

module.exports = {
  userCreationValidation: {
    EMPTY_FIELD: field => `${field} can not be empty`,
    INVALID_FIELD: field => `${field} is invalid`,
    PASSWORD_LENGTH: 'Password should be between 8 and 24 chars long'
  },
  authValidation: {
    NOT_LOGGED_IN: 'You need to be logged in',
    INVALID_TOKEN: 'Invalid token'
  }
};

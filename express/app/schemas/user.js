const { isValidEmail, isValidPassword } = require('../helpers/validations'),
  { userCreationValidation } = require('../constants/errorMessages');

const FIRST_NAME = 'first_name';
const LAST_NAME = 'last_name';
const EMAIL = 'email';
const PASSWORD = 'password';

exports.userCreationSchema = {
  [FIRST_NAME]: {
    in: ['body'],
    errorMessage: userCreationValidation.INVALID_FIELD(FIRST_NAME),
    exists: {
      options: { checkFalsy: true },
      errorMessage: userCreationValidation.EMPTY_FIELD(FIRST_NAME)
    },
    isString: true
  },
  [LAST_NAME]: {
    in: ['body'],
    errorMessage: userCreationValidation.INVALID_FIELD(LAST_NAME),
    exists: {
      options: { checkFalsy: true },
      errorMessage: userCreationValidation.EMPTY_FIELD(LAST_NAME)
    },
    isString: true
  },
  [EMAIL]: {
    in: ['body'],
    errorMessage: userCreationValidation.INVALID_FIELD(EMAIL),
    exists: {
      options: { checkFalsy: true },
      errorMessage: userCreationValidation.EMPTY_FIELD(EMAIL)
    },
    isString: true,
    isEmail: true,
    custom: { options: isValidEmail }
  },
  [PASSWORD]: {
    in: ['body'],
    errorMessage: userCreationValidation.INVALID_FIELD(PASSWORD),
    exists: {
      options: { checkFalsy: true },
      errorMessage: userCreationValidation.EMPTY_FIELD(PASSWORD)
    },
    isString: true,
    isAlphanumeric: true,
    isLength: {
      errorMessage: userCreationValidation.PASSWORD_LENGTH,
      options: { min: 8, max: 24 }
    },
    custom: { options: isValidPassword }
  }
};

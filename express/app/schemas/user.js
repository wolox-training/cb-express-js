exports.userCreationSchema = {
  first_name: {
    in: ['body'],
    errorMessage: 'First name is wrong',
    isString: true,
    exists: true
  },
  last_name: {
    in: ['body'],
    errorMessage: 'Last name is wrong',
    isString: true,
    exists: true
  },
  email: {
    in: ['body'],
    errorMessage: 'First name is wrong',
    isString: true,
    isEmail: true,
    exists: true
  },
  password: {
    in: ['body'],
    errorMessage: 'Password is wrong',
    isString: true,
    isAlphanumeric: true,
    exists: true,
    isLength: { errorMessage: 'Password should be at least 8 chars long', options: { min: 8 } }
  }
};

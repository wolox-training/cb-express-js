exports.userCreationSerializer = user => ({
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
  password: user.password
});

exports.userSerializer = user => ({
  id: user.id,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email
});

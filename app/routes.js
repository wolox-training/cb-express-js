const users = require('./controllers/users'),
  fieldsValidator = require('./middlewares/fieldsValidator').handle,
  authValidator = require('./middlewares/authValidator').handle,
  { userCreationSchema, userLoginSchema } = require('./schemas/user');

const forAdmin = true;

exports.init = app => {
  app.post('/users', fieldsValidator(userCreationSchema), users.create());
  app.post('/users/sessions', fieldsValidator(userLoginSchema), users.logIn);
  app.get('/users', authValidator(), users.list);
  app.post(
    '/admin/users',
    [authValidator(forAdmin), fieldsValidator(userCreationSchema)],
    users.create(forAdmin)
  );
};

const users = require('./controllers/users'),
  albums = require('./controllers/albums'),
  fieldsValidator = require('./middlewares/fieldsValidator').handle,
  authValidator = require('./middlewares/authValidator').handle,
  { userCreationSchema, userLoginSchema } = require('./schemas/user');

exports.init = app => {
  app.post('/users', fieldsValidator(userCreationSchema), users.create);
  app.post('/users/sessions', fieldsValidator(userLoginSchema), users.logIn);
  app.get('/users', authValidator, users.list);
  app.get('/albums', authValidator, albums.list);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};

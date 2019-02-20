const users = require('./controllers/users'),
  fieldsValidator = require('./middlewares/fieldsValidator').handle,
  { userCreationSchema, userLoginSchema } = require('./schemas/user');

exports.init = app => {
  app.post('/users', fieldsValidator(userCreationSchema), users.create);
  app.post('/users/sessions', fieldsValidator(userLoginSchema), users.logIn);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};

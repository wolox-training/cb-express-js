const users = require('./controllers/users'),
  userFieldsValidator = require('./middlewares/userFieldsValidator').handle,
  userLoginValidator = require('./middlewares/userLoginValidator').handle;

exports.init = app => {
  app.post('/users', userFieldsValidator, users.create);
  app.post('/users/sessions', userLoginValidator, users.logIn);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};

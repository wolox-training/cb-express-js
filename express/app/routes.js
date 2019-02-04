const users = require('./controllers/users'),
  userFieldsValidator = require('./middlewares/userFieldsValidator').handle,
  emailValidator = require('./middlewares/emailValidator').handle,
  passwordValidator = require('./middlewares/passwordValidator').handle;

exports.init = app => {
  app.post('/users', [userFieldsValidator, emailValidator, passwordValidator], users.create);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};

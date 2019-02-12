const users = require('./controllers/users'),
  userFieldsValidator = require('./middlewares/userFieldsValidator').handle;

exports.init = app => {
  app.post('/users', userFieldsValidator, users.create);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};

const users = require('./controllers/users'),
  albums = require('./controllers/albums'),
  fieldsValidator = require('./middlewares/fieldsValidator').handle,
  authValidator = require('./middlewares/authValidator').handle,
  adminValidator = require('./middlewares/authValidator').handle,
  albumPurchaseValidator = require('./middlewares/albumPurchaseValidator').handle,
  { userCreationSchema, userLoginSchema } = require('./schemas/user');

const forAdmin = true;

exports.init = app => {
  app.post('/users', fieldsValidator(userCreationSchema), users.create);
  app.post('/users/sessions', fieldsValidator(userLoginSchema), users.logIn);
  app.get('/users', authValidator, users.list);
  app.post(
    '/admin/users',
    [authValidator, adminValidator, fieldsValidator(userCreationSchema)],
    users.createAdmin
  );
  app.get('/albums', authValidator, albums.list);
  app.post('/albums/:id', [authValidator, albumPurchaseValidator], albums.purchase);
};

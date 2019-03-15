const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  expect = chai.expect,
  bcrypt = require('bcryptjs'),
  userService = require('../app/services/userService');

const correctUser = {
  first_name: 'Carlos',
  last_name: 'Bollero',
  email: 'carlos@wolox.com.ar',
  password: 'abcd1234'
};
const missingFieldsUser = { first_name: correctUser.first_name, email: correctUser.email };
const invalidPassUser = { ...correctUser, password: '!@#$' };

const encryptPassword = ({ password }) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(password, salt);
};

const createUser = user =>
  chai
    .request(server)
    .post('/users')
    .send(user);

const logIn = ({ email, password }) =>
  chai
    .request(server)
    .post('/users/sessions')
    .send({ email, password });

describe('/users POST', () => {
  it('should successfully create a user', () =>
    chai
      .request(server)
      .post('/users')
      .send(correctUser)
      .then(res => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        dictum.chai(res, 'Endpoint for user creation');
      }));
  it('should fail, email already exists', () =>
    chai
      .request(server)
      .post('/users')
      .send(correctUser)
      .then(() =>
        chai
          .request(server)
          .post('/users')
          .send(correctUser)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
          })
      ));
  it('should fail, missing field', () =>
    chai
      .request(server)
      .post('/users')
      .send(missingFieldsUser)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
      }));
  it('should fail, invalid password', () =>
    chai
      .request(server)
      .post('/users')
      .send(invalidPassUser)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
      }));
});

describe('/users/sessions POST', () => {
  beforeEach(() => createUser(correctUser));
  it('should successfully login', () =>
    chai
      .request(server)
      .post('/users/sessions')
      .send({ email: correctUser.email, password: correctUser.password })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('token');
      }));
  it('should fail to log in with empty or null email/password', () =>
    chai
      .request(server)
      .post('/users/sessions')
      .send({ email: '', password: null })
      .then(res => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
      }));
  it('should fail to log in with invalid email', () =>
    chai
      .request(server)
      .post('/users/sessions')
      .send({ email: 'invalid@wolox.com.ar', password: correctUser.password })
      .then(res => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
      }));
  it('should fail to log in with valid email but invalid password', () =>
    chai
      .request(server)
      .post('/users/sessions')
      .send({ email: correctUser.email, password: '01928374' })
      .then(res => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
      }));
});

describe('/users GET', () => {
  it('should successfully get a list of users', () =>
    createUser(correctUser).then(() =>
      logIn(correctUser).then(({ body }) =>
        chai
          .request(server)
          .get('/users')
          .set({ token: body.token })
          .send()
          .then(res => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('users');
            expect(res.body.users).to.be.an('array');
            expect(res.body.users.length).to.be.gte(1);
          })
      )
    ));
  it('should successfully get a list of users with page size of 2', () =>
    createUser(correctUser).then(() =>
      createUser({
        first_name: 'Juan',
        last_name: 'Valdez',
        email: 'juan@wolox.com.ar',
        password: 'abcd1234'
      }).then(() =>
        logIn(correctUser).then(({ body }) =>
          chai
            .request(server)
            .get('/users?limit=2')
            .set({ token: body.token })
            .send()
            .then(res => {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.have.property('users');
              expect(res.body.users).to.be.an('array');
              expect(res.body.users.length).to.equal(2);
            })
        )
      )
    ));
  it('should successfully get a list of users with page size of 1 and page number of 2', () =>
    createUser(correctUser).then(() =>
      createUser({
        first_name: 'Juan',
        last_name: 'Valdez',
        email: 'juan@wolox.com.ar',
        password: 'abcd1234'
      }).then(() =>
        logIn(correctUser).then(({ body }) =>
          chai
            .request(server)
            .get('/users?page=2&limit=1')
            .set({ token: body.token })
            .send()
            .then(res => {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.have.property('users');
              expect(res.body.users).to.be.an('array');
              expect(res.body.users.length).to.equal(1);
              expect(res.body.users[0]).to.include({
                id: 2,
                first_name: 'Juan',
                last_name: 'Valdez',
                email: 'juan@wolox.com.ar'
              });
            })
        )
      )
    ));
  it('should fail to get the list if not logged in', () =>
    chai
      .request(server)
      .get('/users')
      .send()
      .then(res => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.include('You need to be logged in');
      }));
  it('should fail to get the list if logged in but missing token header', () =>
    createUser(correctUser).then(() =>
      logIn(correctUser).then(({ body }) =>
        chai
          .request(server)
          .get('/users')
          .set({})
          .send()
          .then(res => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.include('You need to be logged in');
          })
      )
    ));
  it('should fail to get the list if logged in but invalid token', () =>
    createUser(correctUser).then(() =>
      logIn(correctUser).then(({ body }) =>
        chai
          .request(server)
          .get('/users')
          .set({ token: 'this!s0efinitly.aHandMade4nd1nv@lid.shitty7oken' })
          .send()
          .then(res => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.include('Invalid token');
          })
      )
    ));
});

describe('/admin/users POST', () => {
  const rawAdmin = {
    firstName: correctUser.first_name,
    lastName: correctUser.last_name,
    email: 'admin@wolox.com.ar',
    password: correctUser.password,
    isAdmin: true
  };
  const correctAdmin = {
    first_name: rawAdmin.firstName,
    last_name: rawAdmin.lastName,
    email: rawAdmin.email,
    password: rawAdmin.password
  };
  beforeEach(() =>
    encryptPassword(rawAdmin).then(hashedPassword =>
      userService.create({ ...rawAdmin, password: hashedPassword })
    )
  );
  it('should successfully create an admin after logging in', () =>
    logIn({ email: correctAdmin.email, password: correctAdmin.password }).then(resp =>
      chai
        .request(server)
        .post('/admin/users')
        .set({ token: resp.body.token })
        .send({ ...correctAdmin, email: 'anotherAdmin@wolox.com.ar' })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
        })
    ));
  it('should fail to create an admin if not legged in', () =>
    chai
      .request(server)
      .post('/admin/users')
      .send({ ...correctAdmin, email: 'anotherAdmin@wolox.com.ar' })
      .then(res => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.include('You need to be logged in');
      }));
  it('should fail to create an admin if it already exists', () =>
    logIn({ email: correctAdmin.email, password: correctAdmin.password }).then(resp =>
      chai
        .request(server)
        .post('/admin/users')
        .set({ token: resp.body.token })
        .send(correctAdmin)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.include('The admin already exists');
        })
    ));
  it('should upgrade user privileges if already exists', () =>
    createUser({ ...correctUser, email: 'someUser@wolox.com.ar' }).then(() =>
      logIn({ email: correctAdmin.email, password: correctAdmin.password }).then(({ body }) =>
        chai
          .request(server)
          .post('/admin/users')
          .set({ token: body.token })
          .send({ ...correctUser, email: 'someUser@wolox.com.ar' })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.have.property('first_name', 'Carlos');
            expect(res.body).to.have.property('last_name', 'Bollero');
            expect(res.body).to.have.property('email', 'someUser@wolox.com.ar');
          })
      )
    ));
});

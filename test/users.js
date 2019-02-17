const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  expect = chai.expect;

const correctUser = {
  first_name: 'Carlos',
  last_name: 'Bollero',
  email: 'carlos@wolox.com.ar',
  password: 'abcd1234'
};
const missingFieldsUser = { first_name: correctUser.first_name, email: correctUser.email };
const invalidPassUser = { ...correctUser, password: '!@#$' };

const createUser = () =>
  chai
    .request(server)
    .post('/users')
    .send(correctUser);

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
  it('should successfully login', () =>
    createUser().then(() =>
      chai
        .request(server)
        .post('/users/sessions')
        .send({ email: correctUser.email, password: correctUser.password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('token');
        })
    ));
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

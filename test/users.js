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

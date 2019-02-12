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
      // .set('content-type', 'application/json')
      .send(correctUser)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        dictum.chai(res, 'Endpoint for user creation');
      })
      .catch(err => {
        throw err;
      }));
  it('should fail, email already exists', () =>
    chai
      .request(server)
      .post('/users')
      .send(correctUser)
      .catch(err => {
        expect(err).to.have.status(400);
      }));
  it('should fail, missing field', () =>
    chai
      .request(server)
      .post('/users')
      .send(missingFieldsUser)
      .catch(err => {
        expect(err).to.have.status(400);
      }));
  it('should fail, invalid password', () =>
    chai
      .request(server)
      .post('/users')
      .send(invalidPassUser)
      .catch(err => {
        expect(err).to.have.status(400);
      }));
});

const chai = require('chai'),
  server = require('./../app'),
  nock = require('nock'),
  expect = chai.expect;

const correctUser = {
  first_name: 'Carlos',
  last_name: 'Bollero',
  email: 'carlos@wolox.com.ar',
  password: 'abcd1234'
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

const albums = [
  {
    userId: 1,
    id: 1,
    title: 'quidem molestiae enim'
  },
  {
    userId: 1,
    id: 2,
    title: 'sunt qui excepturi placeat culpa'
  },
  {
    userId: 1,
    id: 3,
    title: 'omnis laborum odio'
  }
];

describe('/albums GET', () => {
  before(() => {
    nock('http://albums.com')
      .get('/')
      .reply(200, albums);
  });
  it('should successfully get the albums list when logged in', () =>
    createUser(correctUser).then(() =>
      logIn(correctUser).then(({ body }) =>
        chai
          .request(server)
          .get('/albums')
          .set({ token: body.token })
          .send()
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.albums).to.be.an('array');
          })
      )
    ));
  it('should fail to get the albums if not logged in', () =>
    chai
      .request(server)
      .get('/albums')
      .send()
      .then(res => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.include('You need to be logged in');
      }));
});

describe('/albums/:id POST', () => {
  beforeEach(() => {
    nock('http://albums.com')
      .get('/1')
      .reply(200, albums[0]);
  });
  it('should successfully purchase an album if logged in and does not have it already', () =>
    createUser(correctUser).then(() =>
      logIn(correctUser).then(({ body: { token } }) =>
        chai
          .request(server)
          .post('/albums/1')
          .set({ token })
          .send()
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('albumId');
            expect(res.body).to.have.property('albumName');
            expect(res.body).to.have.property('userId');
          })
      )
    ));
  it('should fail to purchase an album if logged in but already bought it', () =>
    createUser(correctUser).then(() =>
      logIn(correctUser).then(({ body: { token } }) =>
        chai
          .request(server)
          .post('/albums/1')
          .set({ token })
          .send()
          .then(() =>
            chai
              .request(server)
              .post('/albums/1')
              .set({ token })
              .send()
              .then(res => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.include('The album was already purchased');
              })
          )
      )
    ));
  it('should fail to purchase an album if not logged in', () =>
    chai
      .request(server)
      .post('/albums/1')
      .send()
      .then(res => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.include('You need to be logged in');
      }));
});

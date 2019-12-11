const request = require('supertest')
const { expect } = require('chai')

describe('loading express', () => {
  beforeEach(() => server = require('../../app'))
  afterEach(() => server.close())

  it('secures to api', (done) => {
    request(server)
      .get('/')
      .expect(403, done)
  })

  it('secures to api', (done) => {
    request(server)
      .get('/')
      .set('Authorization', 'XYZ')
      .expect(200, done)
  })

  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar/path')
      .set('Authorization', 'XYZ')
      .expect(404, done)
  })
})

describe('movies', () => {
  beforeEach(() => server = require('../../app'))
  afterEach(() => server.close())

  it('saves a movie', (done) => {
    request(server)
      .post('/movies')
      .set('Authorization', 'XYZ')
      .send({
        name: "new movie",
        year: 2019
      })
      .expect(200, {
        name: "new movie",
        year: 2019
      }, done)
  })
})

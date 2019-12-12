const request = require('supertest')
const { expect } = require('chai')

describe('loading express', () => {
  beforeEach(() => server = require('../../app'))
  afterEach(() => server.close())

  it('secures to api 403', (done) => {
    request(server)
      .get('/ingredients')
      .expect(403, done)
  })

  it('secures to api 200', (done) => {
    request(server)
      .get('/ingredients')
      .set('code', 'XYZ')
      .expect(200, done)
  })

  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar/path')
      .set('code', 'XYZ')
      .expect(404, done)
  })
})

describe('posts', () => {
  beforeEach(() => server = require('../../app'))
  afterEach(() => server.close())

  it('saves an ingredinet', (done) => {
    request(server)
      .post('/ingredients')
      .set('code', 'XYZ')
      .send({
        name: "beef",
      })
      .expect(200, {
        status: "done",

      }, done)
  })

  it('saves a meal', (done) => {
    request(server)
        .post('/meals')
        .set('code', 'XYZ')
        .send({
          name: "Pizza",
        })
        .expect(200, {
          name: "Pizza",

        }, done)
  })

  it('saves a meal', (done) => {
    request(server)
        .post('/meals')
        .set('code', 'XYZ')
        .send({
          name: "Pizza",
        })
        .expect(200, {
          name: "Pizza",

        }, done)
  })

})

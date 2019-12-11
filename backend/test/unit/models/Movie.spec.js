const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const MovieModel = require('../../../models/movie')

describe('models/Movie', () => {
  const Model = MovieModel(sequelize, dataTypes)
  const instance = new Model()

  checkModelName(Model)('Movie')

  context('properties', () => {
    ;['name', 'year'].forEach(checkPropertyExists(instance))
  })
})

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ingredients', [
      {
        name: 'aaaaaa',
        kcal: 1.0,
        proteins: 1.0,
        carbs: 1.0,
        fats: 1.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'bbbbbb',
        kcal: 1.0,
        proteins: 1.0,
        carbs: 1.0,
        fats: 1.0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

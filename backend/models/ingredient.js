'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    kcal: DataTypes.FLOAT,
    proteins: DataTypes.FLOAT,
    carbs: DataTypes.FLOAT,
    fats: DataTypes.FLOAT
  }, {});
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Meal, { through: models.FoodIngredient });
  };
  return Ingredient;
};
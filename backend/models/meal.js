'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    kcal: DataTypes.FLOAT,
    proteins: DataTypes.FLOAT,
    carbs: DataTypes.FLOAT,
    fats: DataTypes.FLOAT
  }, {});
  Meal.associate = function(models) {
    Meal.belongsToMany(models.Ingredient, { through: models.FoodIngredient });
  };
  return Meal;
};